import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

export const dynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({
    region: 'local',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'ACCESS_KEY-ID',
    secretAccessKey: 'SECRET_ACCESS_KEY',
  });
};
