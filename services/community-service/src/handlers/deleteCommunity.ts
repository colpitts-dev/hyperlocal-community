import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'
const client = new DynamoDBClient({})

const dynamo = DynamoDBDocumentClient.from(client)

async function deleteCommunity(event: any) {
  const headers = {
    'Content-Type': 'application/json',
  }
  const { id } = event.pathParameters

  const now = new Date()

  try {
    const command = new DeleteCommand({
      TableName: process.env.COMMUNITIES_TABLE_NAME,
      Key: {
        id,
      },
    })

    const response = await dynamo.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Deleted item ${event.pathParameters.id}`,
      }),
      headers,
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = commonMiddleware(deleteCommunity)
