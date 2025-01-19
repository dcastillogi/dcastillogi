import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ConfigProps } from "../shared/types";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";

export class CDKStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        props: cdk.StackProps & {
            config: ConfigProps;
        }
    ) {
        super(scope, id, props);

        // Bucket
        const frontendBucket = new s3.Bucket(this, "FrontendBucket", {
            bucketName: `${props.config.project}-frontend-bucket`,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
        });

        // Pipeline
        const pipeline = new codepipeline.Pipeline(
            this,
            `${props.config.project}Pipeline`,
            {
                pipelineName: `${props.config.project}-pipeline`,
                crossAccountKeys: false,
            }
        );

        const sourceOutput = new codepipeline.Artifact();
        const buildAstroOutput = new codepipeline.Artifact("www");
        const buildCdkOutput = new codepipeline.Artifact("cdk");

        const sourceAction =
            new codepipeline_actions.CodeStarConnectionsSourceAction({
                connectionArn: props.config.connectionArn,
                owner: props.config.github.owner,
                repo: props.config.github.repo,
                branch: props.config.github.branch,
                actionName: "Source",
                output: sourceOutput,
            });

        const buildEnvVars: {
            [key: string]: codebuild.BuildEnvironmentVariable;
        } = {};
        for (const [key, value] of Object.entries(
            props.config.buildEnvironmentVariables || {}
        )) {
            buildEnvVars[key] = { value: value };
        }

        const project = new codebuild.PipelineProject(this, "Project", {
            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
                computeType: codebuild.ComputeType.SMALL,
                privileged: true,
            },
            environmentVariables: {
                AWS_ACCOUNT_ID: { value: this.account },
                ...buildEnvVars,
            },
        });

        const codebuildAction = new codepipeline_actions.CodeBuildAction({
            actionName: "CodeBuild_Action",
            input: sourceOutput,
            project: project,
            outputs: [buildAstroOutput, buildCdkOutput],
        });

        const deployS3 = new codepipeline_actions.S3DeployAction({
            actionName: "Astro_Deploy",
            bucket: frontendBucket,
            input: buildAstroOutput,
            extract: true,
        });

        const deployCdk =
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
                actionName: "Cloudformation_Deploy",
                stackName: `${props.config.project}Stack`,
                templatePath: buildCdkOutput.atPath(
                    `${props.config.project}Stack.template.json`
                ),
                adminPermissions: true,
            });

        pipeline.addStage({
            stageName: "Source",
            actions: [sourceAction],
        });

        pipeline.addStage({
            stageName: "Build",
            actions: [codebuildAction],
        });

        pipeline.addStage({
            stageName: "Deploy",
            actions: [deployS3, deployCdk],
        });

        // CloudFront
        const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
            this,
            "HostedZone",
            {
                hostedZoneId: props.config.hostedZoneId,
                zoneName: props.config.zoneName,
            }
        );

        const domains = [
            props.config.domainName,
            `www.${props.config.domainName}`,
        ];

        const domainCert = new certificatemanager.Certificate(
            this,
            "AppDomainCert",
            {
                domainName: domains[0],
                subjectAlternativeNames: [domains[1]],
                validation:
                    certificatemanager.CertificateValidation.fromDns(
                        hostedZone
                    ),
            }
        );

        const contentBucket = new s3.Bucket(this, "ContentBucket", {
            bucketName: `${props.config.project}-content-bucket`,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
        });

        const distribution = new cloudfront.Distribution(
            this,
            "AppDistribution",
            {
                defaultBehavior: {
                    origin: origins.S3BucketOrigin.withOriginAccessControl(
                        frontendBucket
                    ),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
                    allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                },
                additionalBehaviors: {
                    "/content/*": {
                        origin: origins.S3BucketOrigin.withOriginAccessControl(
                            contentBucket
                        ),
                        viewerProtocolPolicy:
                            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
                        allowedMethods:
                            cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                    },
                },
                defaultRootObject: "index.html",
                certificate: domainCert,
                domainNames: domains,
            }
        );

        for (const domain of domains) {
            new route53.ARecord(this, `ARecord${domain}Cloudfront`, {
                recordName: domain,
                zone: hostedZone,
                target: route53.RecordTarget.fromAlias(
                    new route53Targets.CloudFrontTarget(distribution)
                ),
            });
        }

        // Badges Feature

        const badgesTable = new dynamodb.Table(this, "BadgesTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            tableName: `${props.config.project}-badges-table`,
        });

        const badgesLambda = new lambda.Function(this, "BadgesLambda", {
            runtime: lambda.Runtime.NODEJS_LATEST,
            handler: "index.handler",
            code: lambda.Code.fromAsset(
                path.join(__dirname, "../../lambdas/badges-lambda")
            ),
            environment: {
                TABLE_NAME: badgesTable.tableName,
            },
            functionName: `${props.config.project}-badges-lambda`,
        });

        badgesTable.grantReadData(badgesLambda);

        // API Gateway
        const apiDomainCert = new certificatemanager.Certificate(
            this,
            "ApiCert",
            {
                domainName: `api.${props.config.domainName}`,
                validation:
                    certificatemanager.CertificateValidation.fromDns(
                        hostedZone
                    ),
            }
        );

        // Content Feature
        const contentTable = new dynamodb.Table(this, "ContentTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            tableName: `${props.config.project}-content-table`,
        });

        const apiGateway = new cdk.aws_apigateway.RestApi(this, "ApiGateway", {
            restApiName: `${props.config.project}-api-gateway`,
            description: "API Gateway for the project",
            endpointConfiguration: {
                types: [cdk.aws_apigateway.EndpointType.REGIONAL],
            },
            deployOptions: {
                stageName: "v1",
            },
            domainName: {
                domainName: `api.${props.config.domainName}`,
                certificate: apiDomainCert,
                endpointType: cdk.aws_apigateway.EndpointType.REGIONAL,
            },
            defaultCorsPreflightOptions: {
                allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
                allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
                allowHeaders: cdk.aws_apigateway.Cors.DEFAULT_HEADERS,
            },
        });

        apiGateway.domainName!.addBasePathMapping(apiGateway, {
            basePath: "v1",
            stage: apiGateway.deploymentStage,
        });

        // Create badges resource and method
        const badgesResource = apiGateway.root.addResource("badges");

        const badgesModelJsonSchema = {
            type: cdk.aws_apigateway.JsonSchemaType.ARRAY,
            items: {
                type: cdk.aws_apigateway.JsonSchemaType.OBJECT,
                properties: {
                    id: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    issuer: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    issued_at_date: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    image_url: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    description: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    name: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    url: {
                        type: cdk.aws_apigateway.JsonSchemaType.STRING,
                    },
                    order: {
                        type: cdk.aws_apigateway.JsonSchemaType.NUMBER,
                    },
                },
                required: [
                    "id",
                    "issuer",
                    "issued_at_date",
                    "image_url",
                    "description",
                    "name",
                    "url",
                    "order",
                ],
            },
        };

        // Create model for badges array response
        const badgesModel = new cdk.aws_apigateway.Model(this, "BadgesModel", {
            restApi: apiGateway,
            contentType: "application/json",
            description: "Badges model",
            modelName: "BadgesModel",
            schema: badgesModelJsonSchema,
        });

        // Add GET method
        badgesResource.addMethod(
            "GET",
            new cdk.aws_apigateway.LambdaIntegration(badgesLambda, {
                proxy: false,
                integrationResponses: [
                    {
                        statusCode: "200",
                        responseParameters: {
                            "method.response.header.Access-Control-Allow-Origin":
                                "'*'",
                            "method.response.header.Access-Control-Allow-Methods":
                                "'GET,OPTIONS'",
                            "method.response.header.Access-Control-Allow-Headers":
                                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
                            "method.response.header.Content-Type":
                                "'application/json'",
                        },
                        responseTemplates: {
                            "application/json": '$input.json("$")',
                        },
                    },
                ],
            }),
            {
                methodResponses: [
                    {
                        // Success response definition
                        statusCode: "200",
                        responseModels: {
                            "application/json": badgesModel,
                        },
                        responseParameters: {
                            "method.response.header.Access-Control-Allow-Origin":
                                true,
                            "method.response.header.Access-Control-Allow-Methods":
                                true,
                            "method.response.header.Access-Control-Allow-Headers":
                                true,
                            "method.response.header.Content-Type": true,
                        },
                    },
                ],
            }
        );

        new route53.ARecord(this, `ARecord${props.config.project}ApiGateway`, {
            recordName: `api.${props.config.domainName}`,
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(
                new route53Targets.ApiGateway(apiGateway)
            ),
        });

        // Adding tags as resource group
        if (props.config.applicationTagValue) {
            cdk.Tags.of(this).add(
                "awsApplication",
                props.config.applicationTagValue
            );
        }
    }
}
