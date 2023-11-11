/* eslint-disable @typescript-eslint/no-unused-vars -- ignore */
import { cookies } from 'next/headers'

module.exports = {
  POST: logout,
}

function logout(req: Request): void {
  cookies().delete('authorization')
}
