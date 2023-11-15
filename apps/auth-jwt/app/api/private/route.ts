/* eslint-disable no-console -- todo: remove */
/* eslint-disable @typescript-eslint/no-unused-vars -- ignore */
import { cookies } from 'next/headers'

export async function POST(request: Request, response: Response) {
  const token = cookies().get('authorization')
  if (!token) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- ignore
    const res = await fetch(`${process.env.MEMBERSHIP_SERVICE}/communities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    })

    const data = (await res.json()) || {}
    console.log({ data })
    return new Response(JSON.stringify(data), {
      status: res.status,
    })
  } catch (e) {
    console.log(e)
  }
  return new Response(JSON.stringify({ status: 'error', message: 'Opps!' }), {
    status: 500,
  })
}
