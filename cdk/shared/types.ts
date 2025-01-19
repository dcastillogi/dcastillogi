export interface ConfigProps {
    project: string;
    connectionArn: string;
    github: {
        owner: string;
        repo: string;
        branch: string;
    };
    buildEnvironmentVariables?: { [key: string]: string };
    domainName: string;
    hostedZoneId: string;
    zoneName: string;
    applicationTagValue?: string;
}