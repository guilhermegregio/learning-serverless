import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import awaitTo from './libs/await-response-error';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };

  const [err, result] = await awaitTo(dynamoDbLib.call('put', params));

  if (!err) {
    callback(null, success(params.Item));
  } else {
    callback(null, failure({ status: false }));
  }
};