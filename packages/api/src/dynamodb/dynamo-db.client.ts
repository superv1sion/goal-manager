import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDbClient {
  public readonly db: DynamoDBDocumentClient;
  public readonly dynamoClient: DynamoDBClient;
  public readonly MAX_BATCH_WRITE_LENGTH = 25;
  public readonly MAX_BATCH_GET_LENGTH = 100;

  constructor() {
    const configuration: DynamoDBClientConfig = {
      apiVersion: '2012-08-10',
    };
    this.dynamoClient = new DynamoDBClient(configuration);
    this.db = DynamoDBDocumentClient.from(this.dynamoClient);
  }
}
