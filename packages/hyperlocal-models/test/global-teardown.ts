import type { MongoMemoryServer } from 'mongodb-memory-server'

async function globalTeardown() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE
  await instance.stop()
}

export default globalTeardown
