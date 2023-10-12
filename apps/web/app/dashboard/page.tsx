'use client'

import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import styles from './page.module.css'

export default withPageAuthRequired(function Dashboard({ user }) {
  const { name, email, picture } = user
  return (
    <>
      <header className={styles.header}>
        <a href="/api/auth/logout">Logout</a>
      </header>
      <main className={styles.main}>
        <section className={`${styles.profile}`}>
          <Image
            alt={name ?? ''}
            height={240}
            src={picture ?? ''}
            width={240}
          />
          <div>
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </section>
      </main>
    </>
  )
})
