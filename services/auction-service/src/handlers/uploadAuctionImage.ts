import createHttpError from 'http-errors'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { commonMiddleware } from '@lib/commonMiddleware'
import { uploadImageS3 } from '@lib/uploadImageS3'
import { setAuctionImage } from '@lib/setAuctionImage'
import { getAuctionById } from './getAuction'

async function uploadAuctionImage(event: any) {
  const { id } = event.pathParameters
  const { email } = event?.requestContext.authorizer
  const auction = await getAuctionById(id)

  // Validate ownership
  if (email !== auction.seller) {
    throw new createHttpError.Forbidden(
      'You are not the seller of this auction!',
    )
  }

  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64, 'base64')

  let updatedAuction

  try {
    const result = await uploadImageS3(auction.id + '.png', buffer)
    updatedAuction = await setAuctionImage(auction.id, result)
  } catch (error) {
    console.error(error)
    createHttpError.InternalServerError(error as string)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  }
}

const requestSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'string',
      minLength: 1,
      pattern: 'data:image/([a-zA-Z]*);base64,([^"]*)',
    },
  },
}

export const handler = commonMiddleware(uploadAuctionImage).use(
  validator({
    eventSchema: transpileSchema(requestSchema),
  }),
)
