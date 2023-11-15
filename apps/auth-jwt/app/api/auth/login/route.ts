/* eslint-disable no-console -- todo: remove */
/* eslint-disable turbo/no-undeclared-env-vars -- todo: remove */
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request, response: Response) {
  try {
    const res = await fetch(`${process.env.AUTH_SERVICE}/oauth/token`, {
      method: 'POST',
    })

    const idToken = `${res.headers
      .get('set-cookie')
      ?.replace('authorization=', '')
      .replace('; path=/hyperlocal; Secure; HttpOnly', '')}`

    cookies().set({
      name: 'authorization',
      value: idToken,
      httpOnly: true,
      secure: true,
      path: '/',
    })

    return new Response(null, {
      status: 200,
    })
  } catch (error: any) {
    console.log(error)
    return new Response('Opps! There was a problem issuing id token', {
      status: 500,
    })
  }
}
