import createError from 'http-errors'
import { commonMiddleware } from 'src/lib/commonMiddleware'

async function hello(event: any) {
  // const { id } = event.pathParameters

  try {
    const response = {
      message: 'hello serverless v3 + typescript',
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = commonMiddleware(hello)
