import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

import { Person } from '@hyperlocal/models'
//import { Membership } from '../src/models/membership.model'

dotenv.config()

const seedData = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    age: 21,
  },
  {
    name: 'Zoolander',
    email: 'zoolander@example.com',
    age: 33,
  },
]

async function run() {
  const dbUri =
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/hyperlocal-community_dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  // Seed people
  const members = await Person.collection.insertMany(seedData)
  console.log(members)

  await mongoose.connection.close()
  console.log('\n')
  console.log('🌱 Database seeded with data')
  console.log('👋 Please start the service using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
