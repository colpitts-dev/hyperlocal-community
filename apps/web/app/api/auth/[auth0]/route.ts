import type { HandleAuth } from '@auth0/nextjs-auth0'
import { handleAuth } from '@auth0/nextjs-auth0'

export const GET = handleAuth() as HandleAuth
