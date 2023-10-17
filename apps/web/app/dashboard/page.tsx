'use client'

import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Card } from '@evoke-ui/react'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

async function getData() {
  const res = await fetch('http://localhost:4001/dev/communities')

  if (!res.ok) {
    throw new Error('Failed to fetch community data')
  }

  return res.json()
}

export default withPageAuthRequired(function Dashboard({ user }) {
  const { name, email, picture } = user
  const [data, setData] = useState<any[] | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4001/dev/communities')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No community data</p>

  console.log(data)

  return (
    <>
      <header className={styles.header}>
        <a className={styles['logout-btn']} href="/api/auth/logout">
          Logout
        </a>
      </header>
      <main className={styles.main}>
        <section className="flex flex-wrap items-center justify-center p-4 mb-8 rounded bg-surface">
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
        <section className={`${styles.grid} gap-4`}>
          {data.map(({ title, description }) => (
            <Card className={styles.card} href={'#'} key={title} title={title}>
              {description}
            </Card>
          ))}
        </section>
      </main>
    </>
  )
})
