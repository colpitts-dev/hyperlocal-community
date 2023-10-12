'use client'

import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import styles from './page.module.css'

export default withPageAuthRequired(function Dashboard({ user }) {
  const { name, email, picture } = user
  return (
    <>
      <header className={styles.header}>
        <a className={styles['logout-btn']} href="/api/auth/logout">
          Logout
        </a>
      </header>
      <main className={styles.main}>
        <section className="flex flex-wrap items-center justify-center p-4 bg-surface">
          <Image
            alt={name ?? ''}
            height={240}
            src={picture ?? ''}
            width={240}
          />
          <div className="flex flex-col self-stretch justify-between ml-4">
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p>{email}</p>
            </div>
            <p>Private Members Dashboard</p>
          </div>
        </section>
      </main>
    </>
  )
})
