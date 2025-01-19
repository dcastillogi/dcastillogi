import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async () => {
    const items = await dynamo.scan({
        TableName: process.env.TABLE_NAME,
    });

    return items.Items.sort((a, b) => a.order - b.order);
};
