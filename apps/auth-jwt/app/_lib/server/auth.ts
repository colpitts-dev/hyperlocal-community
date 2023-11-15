import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export interface Auth {
  isAuthenticated: () => boolean
  verifyToken: () => string
}

export const auth: Auth = {
  isAuthenticated,
  verifyToken,
}

function isAuthenticated() {
  try {
    verifyToken()
    return true
  } catch {
    return false
  }
}

function verifyToken() {
  const token = cookies().get('authorization')?.value ?? ''
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- JWT_SECRET is defined in .env.local
  const secret = process.env.JWT_SECRET || ''
  const decoded = jwt.verify(token, secret)
  const id = decoded.sub as string
  return id
}
