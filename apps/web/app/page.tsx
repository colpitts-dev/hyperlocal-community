import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export default async function Index(): Promise<JSX.Element> {
  const session = await getSession()
  if (session?.user) redirect('/dashboard')

  return (
    <>
      <header className={styles.header}>
        <a className={styles['login-btn']} href="/api/auth/login">
          Login
        </a>
      </header>
      <main className={styles.main}>
        <h1>
          <span className="text-primary">Hyper</span>
          <span className="text-primary-variant">local</span>
        </h1>
        <p>Public Landing Page</p>
      </main>
    </>
  )
}
