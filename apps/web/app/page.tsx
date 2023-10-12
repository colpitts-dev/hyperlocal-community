import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'

export default async function Index(): Promise<JSX.Element> {
  const session = await getSession()
  if (session?.user) redirect('/dashboard')

  return (
    <>
      <header>
        <a href="/api/auth/login">Login</a>
      </header>
      <main>
        <h1>Hyperlocal</h1>
        <p>Public Landing Page</p>
      </main>
    </>
  )
}
