import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import { Card } from '@evoke-ui/react'
import styles from './page.module.css'

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Hyperlocal features and API.',
  },
  {
    title: 'Learn',
    href: 'https://turbo.build/repo/docs/handbook',
    description: 'Learn more about community engagement with our handbook.',
  },
  {
    title: 'Memberships',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    description:
      'Manage memberships for all your online communities with ease.',
  },
  {
    title: 'Blockchain',
    href: 'https://vercel.com/new',
    description:
      'Leverages Blockchain technology to allow community members to trade products and services',
  },
]

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
        <section className="mb-12 text-center">
          <h1>
            <span className="text-primary">Hyper</span>
            <span className="text-primary-variant">local</span>
          </h1>
          <p>Public Landing Page</p>
        </section>
        <section className={`${styles.grid} space-x-4`}>
          {LINKS.map(({ title, href, description }) => (
            <Card className={styles.card} href={href} key={title} title={title}>
              {description}
            </Card>
          ))}
        </section>
      </main>
    </>
  )
}
