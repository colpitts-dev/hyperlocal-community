import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import createError from 'http-errors'
import { v4 as uuid } from 'uuid'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

async function createCommunity(event: any) {
  const { title } = event?.body
  const now = new Date()

  const community = {
    id: uuid(),
    title,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  try {
    const command = new PutCommand({
      TableName: process.env.COMMUNITIES_TABLE_NAME,
      Item: community,
    })

    await docClient.send(command)

    return {
      statusCode: 201,
      body: JSON.stringify(community),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = middy(createCommunity)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler())
