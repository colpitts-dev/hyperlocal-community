/* eslint-disable no-console -- todo: remove */
/* eslint-disable turbo/no-undeclared-env-vars -- todo: remove */ import { cookies } from 'next/headers'

export async function POST(request: Request, response: Response) {
  const payload = await request.json()
  try {
    const res = await fetch(`${process.env.AUTH_SERVICE}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //grant_type: 'password',
        //client_id: process.env.CLIENT_ID,
        //client_secret: process.env.CLIENT_SECRET,
        email: payload.email,
        password: payload.password,
      }),
    })

    const json = await res.json()

    cookies().set({
      name: 'authorization',
      value: json.jwt,
      httpOnly: true,
      secure: true,
      path: '/',
    })

    return new Response(JSON.stringify(json), {
      status: 200,
    })
  } catch (error: any) {
    console.log(error)
    return new Response('Opps! There was a problem issuing id token', {
      status: 500,
    })
  }
}
