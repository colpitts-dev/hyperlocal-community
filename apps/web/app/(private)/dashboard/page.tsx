'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Card } from '@evoke-ui/react'
import styles from './styles.module.css'

interface MyCommunity {
  title: string
  description: string
  isPublic: boolean
  memberships: string[]
  theme?: object
}

export default withPageAuthRequired(function Dashboard({ user }) {
  const { name, email, picture } = user
  const [data, setData] = useState<MyCommunity[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:4001/dev/communities')
        .then(res => res.json())
        .then(json => {
          setData(json as MyCommunity[])
          setIsLoading(false)
        })
    }
    void fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No community data</p>

  return (
    <>
      <header className={styles.header}>
        <div className="flex items-center space-x-4">
          <Image alt={name ?? ''} height={48} src={picture ?? ''} width={48} />

          <p>{email}</p>
        </div>
        <a className={styles['logout-btn']} href="/api/auth/logout">
          Logout
        </a>
      </header>

      <main className={styles['dashboard-grid']}>
        {data.map(({ title, description, theme, memberships }) => {
          const themePrimary = {
            backgroundColor: (theme as { light: { primary: string } }).light
              .primary,
            color: (theme as { light: { 'on-primary': string } }).light[
              'on-primary'
            ],
          }

          const themeSecondary = {
            backgroundColor: (theme as { light: { secondary: string } }).light
              .secondary,
            color: (theme as { light: { 'on-secondary': string } }).light[
              'on-secondary'
            ],
          }

          const themeTertiary = {
            backgroundColor: (theme as { light: { tertiary: string } }).light
              .tertiary,
            color: (theme as { light: { 'on-tertiary': string } }).light[
              'on-tertiary'
            ],
          }

          const themeLight = {
            color: (theme as { ui: { dark: string } }).ui.dark,
            backgroundColor: (theme as { ui: { light: string } }).ui.light,
          }

          const themeDark = {
            backgroundColor: (theme as { ui: { dark: string } }).ui.dark,
            color: (theme as { ui: { light: string } }).ui.light,
          }

          return (
            <Card className={styles.card} href={'#'} key={title} title={title}>
              {description}
              <div className="my-4">
                <div style={themeDark}>&nbsp;</div>
                <div style={themePrimary}>&nbsp;</div>
                <div style={themeSecondary}>&nbsp;</div>
                <div style={themeTertiary}>&nbsp;</div>
                <div style={themeLight}>&nbsp;</div>
              </div>
              <div>
                <h3 className="font-mono text-2xl">
                  Members: {memberships.length}
                </h3>
              </div>
            </Card>
          )
        })}
      </main>
    </>
  )
})
