import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Person } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { getErrorMessage } from '../lib/errors'
import { commonMiddleware } from '../lib/commonMiddleware'

async function issueToken(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false

  try {
    // Connect to mongodb
    await connectMongoDB()
    const { email, password } = event?.body

    const person = await Person.findOne({ email }).populate({
      path: 'memberships',
      populate: { path: 'community', select: ['id', 'title', 'description'] },
    })

    if (!(person && bcrypt.compareSync(password, person?.hash))) {
      throw 'Email or password is incorrect'
    }

    const audience = person.memberships.map(membership => {
      return `membership:${membership.community.id}`
    })

    const token = jwt.sign(
      {
        sub: person.id,
        aud: ['membership:hyperlocal', ...audience],
        nickname: person.nickname,
        email: person.email,
        email_verified: person.emailVerified,
        wallet: '0x0000000',
        iss: 'https://auth.ca.hyper-local.site',
        scope: 'openid profile nickname wallet email',
      },
      process.env.OAUTH_PUBLIC_KEY as string,
      { expiresIn: '1h' },
    )

    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
        'Set-Cookie': `authorization=${token}; path=/hyperlocal; Secure; HttpOnly;`,
      },
      body: JSON.stringify({
        profile: {
          nickname: person.nickname,
          email: person.email,
          wallet: person.wallets?.[0],
        },
        jwt: token,
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 401,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(issueToken)
