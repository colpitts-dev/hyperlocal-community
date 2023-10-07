import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from 'src/lib/commonMiddleware'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function updateCommunity(event: any) {
  const headers = {
    'Content-Type': 'application/json',
  }
  const { id } = event.pathParameters
  const { title } = event.body
  const now = new Date()

  try {
    const command = new PutCommand({
      TableName: process.env.COMMUNITIES_TABLE_NAME,
      Item: {
        id,
        title,
        updateAt: now.toISOString(),
      },
    })

    const response = await dynamo.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify(response.Attributes),
      headers,
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = commonMiddleware(updateCommunity)
