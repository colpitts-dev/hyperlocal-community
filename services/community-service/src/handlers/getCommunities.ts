import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from 'src/lib/commonMiddleware'

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

export const handler = commonMiddleware(getCommunities)
