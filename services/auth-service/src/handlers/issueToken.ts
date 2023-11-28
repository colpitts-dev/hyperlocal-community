import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Person } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { getErrorMessage } from '../lib/errors'
import { commonMiddleware } from '../lib/commonMiddleware'

interface JWTClaims {
  sub: string
  aud: string[]
  iss: string
  scope: string
  email?: string
  email_verified?: boolean
  nickname?: string
  wallet?: string
}

interface ResponseBody {
  profile?: {
    nickname?: string
  }
  email?: string
  wallet?: string
  jwt?: string
}

async function issueToken(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false

  try {
    // Destructure request body
    const { email, password, scope = 'openid profile' } = event?.body

    // Connect to mongodb
    await connectMongoDB()

    // Look up person by email
    const person = await Person.findOne({ email }).populate({
      path: 'memberships',
      populate: { path: 'community', select: ['id', 'title', 'description'] },
    })

    // Verify password
    if (!(person && bcrypt.compareSync(password, person?.hash))) {
      throw 'Email or password is incorrect'
    }

    // Prepare audience for jwt
    const audience = person.memberships.map(membership => {
      return `membership:${membership.community.id}`
    })

    // TODO: enable web3 wallet support
    const wallet = person.wallets?.[0]

    // Prepare response body
    let body: ResponseBody = {}

    // Prepare claims for jwt
    let claims: JWTClaims = {
      sub: person.id,
      aud: ['membership:hyperlocal', ...audience],
      iss: 'https://auth.ca.hyper-local.site',
      scope: 'openid',
    }

    // Add profile
    if (scope.includes('profile')) {
      const addProfile = claims.scope + ' profile'
      claims = {
        ...claims,
        nickname: person.nickname,
        scope: addProfile,
      }
      body = {
        profile: {
          nickname: person.nickname,
        },
      }
    }

    // Add email
    if (scope.includes('email')) {
      const addEmail = claims.scope + ' email'
      claims = {
        ...claims,
        email: person.email,
        email_verified: person.emailVerified,
        scope: addEmail,
      }
      body = {
        ...body,
        email: person.email,
      }
    }

    // Add web3 wallet
    if (scope.includes('wallet')) {
      const addWallet = claims.scope + ' wallet'
      claims = {
        ...claims,
        wallet,
        scope: addWallet,
      }
      body = {
        ...body,
        wallet,
      }
    }

    // Sign jwt token
    const token = jwt.sign(claims, process.env.OAUTH_PUBLIC_KEY as string, {
      expiresIn: '1h',
    })

    // Append signed token to response body
    body = {
      ...body,
      jwt: token,
    }

    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
        /* Set secure cookie in headers */
        'Set-Cookie': `authorization=${token}; path=/hyperlocal; Secure; HttpOnly;`,
      },
      body: JSON.stringify(body),
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
