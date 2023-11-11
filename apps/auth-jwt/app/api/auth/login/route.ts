/* eslint-disable turbo/no-undeclared-env-vars -- ignore */
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  //const token = cookies().get('token') || { value: 'no token' }
  const secret = process.env.JWT_SECRET || 'secret'
  // create a jwt token that is valid for 7 days
  const token = jwt.sign(
    {
      sub: 'person-id',
      aud: ['membership:hyperlocal', 'membership:budx'],
      iss: 'https://auth.hyper-local.site',
    },
    secret,
    { expiresIn: '7d' },
  )

  const person = {
    nickname: 'John Doe',
    email: 'john.doe@example.com',
    wallets: ['0x0000000'],
  }

  return new Response(JSON.stringify(person), {
    status: 201,
    headers: {
      'set-cookie': `authorization=${token}; path=/hyperlocal; HttpOnly`,
      'content-type': 'application/json',
    },
  })
}
