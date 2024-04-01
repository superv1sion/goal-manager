import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { aws } from 'dynamoose';

let dynamoDbClient: DynamoDB | undefined;

export function initializeDynamoDB(): void {
  if (process.env.DB_MOCKED !== 'true') {
    if (dynamoDbClient === undefined) {
      dynamoDbClient = new DynamoDB({
        region: 'eu-west-1',
        credentials: {
          accessKeyId: 'uuc4n',
          secretAccessKey: 'f8nax8',
        },
        endpoint: {
          hostname: 'dynamodb-local',
          port: 8000,
          path: '',
          protocol: 'http:',
        },
      });
      // eslint-disable-next-line no-console
      console.log('initializing dynamodb client');
      // aws.ddb.local('http://localhost:8001');
      console.log(dynamoDbClient);
      aws.ddb.set(dynamoDbClient);
    }
  }
}
