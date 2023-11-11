import jwt from 'jsonwebtoken'

export async function handler() {
  console.log('SIGN JWT')

  const token = jwt.sign(
    {
      sub: 'person-id',
      aud: ['membership:hyperlocal', 'membership:budx'],
      nickname: 'John Doe',
      email: 'john.doe@example.com',
      wallet: '0x0000000',
      iss: 'https://auth.ca.hyper-local.site',
      scope: 'openid profile nickname email wallet',
    },
    process.env.OAUTH_PUBLIC_KEY as string,
    { expiresIn: '7d' },
  )

  console.log('RETURN JWT: ', token)

  return {
    statusCode: 201,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
      'Set-Cookie': `authorization=${token}; path=/hyperlocal; HttpOnly`,
    },
    body: JSON.stringify({
      message: 'Successfully issued token.',
    }),
  }
}
