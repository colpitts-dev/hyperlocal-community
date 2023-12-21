/* eslint-disable @typescript-eslint/no-unused-vars -- ignore */
import { cookies } from 'next/headers'

export async function POST(request: Request, response: Response) {
  cookies().delete('authorization')
  return new Response(null, {
    status: 200,
  })
}
