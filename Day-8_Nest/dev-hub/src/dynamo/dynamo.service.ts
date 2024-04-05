import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from 'src/aws-config/dynamoDBClient';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class DynamoService {
  private dynamodb: AWS.DynamoDB;

  constructor() {
    // Initialize the AWS DynamoDB client
    this.dynamodb = new AWS.DynamoDB({
      region: 'local', // Specify your desired region
      // For local development with DynamoDB Local, specify the endpoint:
      endpoint: 'http://localhost:8000',
    });
  }

  async createTable(tableName: string): Promise<void> {
    // Define the parameters for creating the table
    const params: AWS.DynamoDB.CreateTableInput = {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S', // Assuming 'id' is a string attribute
        },
        // Add more attribute definitions as needed
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH', // Partition key
        },
        // Add more key schema definitions as needed
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5, // Adjust according to your needs
        WriteCapacityUnits: 5, // Adjust according to your needs
      },
    };

    try {
      // Create the table
      await this.dynamodb.createTable(params).promise();
      console.log(`Table '${tableName}' created successfully.`);
    } catch (error) {
      console.error(`Error creating table '${tableName}':`, error);
      throw error;
    }
  }

  async createBook(createBookDto: CreateBookDto) {
    //await this.createTable('Books');
    return dynamoDBClient()
      .put({
        TableName: 'Books',
        Item: {
          id: uuid(),
          title: createBookDto.title,
          author: createBookDto.author,
        },
      })
      .promise();
  }

  async getBooks() {
    const results = await dynamoDBClient()
      .scan({
        TableName: 'Books',
      })
      .promise();

    return results.Items;
  }

  async deleteBook(bookId: string) {
    console.log(bookId);
    return await dynamoDBClient()
      .delete({
        TableName: 'Books',
        Key: { id: bookId },
      })
      .promise();
  }
}
