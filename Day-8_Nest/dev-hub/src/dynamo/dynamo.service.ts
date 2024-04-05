import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from 'src/aws-config/dynamoDBClient';

@Injectable()
export class DynamoService {
  async create() {
    return await dynamoDBClient()
      .put({
        TableName: 'testing',
        Item: {
          bookId: '123',
          title: 'my book',
          author: 'miad',
        },
      })
      .promise();
  }
}
