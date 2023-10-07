import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import createError from 'http-errors'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

async function getCommunities(event: any) {
  try {
    const command = new ScanCommand({
      TableName: process.env.COMMUNITIES_TABLE_NAME,
    })

    const response = await docClient.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = middy(getCommunities)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler())
