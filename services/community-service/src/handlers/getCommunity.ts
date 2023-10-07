import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import createError from 'http-errors'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

async function getCommunity(event: any) {
  const { id } = event.pathParameters

  try {
    const command = new GetCommand({
      TableName: process.env.COMMUNITIES_TABLE_NAME,
      Key: { id },
    })

    const response = await docClient.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = middy(getCommunity)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler())
