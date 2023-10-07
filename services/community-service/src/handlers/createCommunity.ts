import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { v4 as uuid } from 'uuid'
import { commonMiddleware } from '../lib/commonMiddleware'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

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

    await dynamo.send(command)

    return {
      statusCode: 201,
      body: JSON.stringify(community),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = commonMiddleware(createCommunity)
