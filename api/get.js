import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import awaitTo from './libs/await-response-error';

export async function main(event, context, callback) {
  const params = {
    TableName: 'notes',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  const [err, result] = await awaitTo(dynamoDbLib.call('get', params));

  if (!err) {
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }));
    }
  } else {
    callback(null, failure({ status: false }));
  }
};