import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import {
  Person,
  Membership,
  Community,
  CommunityDocument,
  PersonDocument,
} from '@hyperlocal/models'

dotenv.config()

const COMMUNITY_SEEDS = 5
const PEOPLE_SEEDS = 25

const getPersonSeed = () => {
  const name = faker.person.fullName()

  return {
    name,
    email: faker.internet.email({ firstName: name }),
    age: faker.number.int({ min: 18, max: 50 }),
  }
}

const getCommunitySeed = () => ({
  title: faker.company.name(),
  description: faker.company.buzzPhrase(),
})

async function run() {
  const dbUri =
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/hyperlocal-community_dev'
  mongoose.set('strictQuery', false)

  const conn = await connect(dbUri)

  // Drop all existing data
  await conn.connection.db.dropDatabase()

  // Seed communities
  let i = 0
  while (i < COMMUNITY_SEEDS) {
    const communityInput = getCommunitySeed()
    const community = new Community({ ...communityInput })
    await community.save()
    i++
  }

  // Seed people w/ memberships
  let j = 0
  while (j < PEOPLE_SEEDS) {
    console.log(`👤  Adding person ${j + 1}/${PEOPLE_SEEDS}`)

    const personInput = getPersonSeed()
    const person = new Person({ ...personInput })

    const docs = await Community.aggregate([{ $sample: { size: 1 } }])
    console.log({ docs })

    const myCommunity = await Community.findById(docs[0])

    const membership = new Membership({
      title: `${person.name} - ${myCommunity?.title}`,
      owner: person,
      community: myCommunity,
    })
    await membership.save()
    myCommunity?.memberships.push(membership)
    await myCommunity?.save()
    person.memberships.push(membership)

    await person.save()

    j++
  }

  await mongoose.connection.close()
  console.log('\n')
  console.log('🌱 Database seeded with data')
  console.log('👋 Please start the service using `yarn dev`\n')
  process.exit(0)
}

run().catch(err => console.log(err))
