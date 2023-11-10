import mongoose from 'mongoose'

let conn: Promise<typeof mongoose> | null = null

const uri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/service-name_dev'

export const connectMongoDB = async () => {
  if (conn === null) {
    mongoose.set('strictQuery', false)
    conn = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
        autoCreate: true,
      })
      .then(() => {
        console.log(`💾 MongoDB successfully connected`)
        return mongoose
      })
      .catch(error => {
        console.log(`🚫 MongoDB connect error`)
        process.exit(0)
      })

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn
  }

  return conn
}

export async function disconnectMongoDB() {
  try {
    await mongoose.connection.close(false)
    console.log(`💫 MongoDB connection closed.`)
  } catch (error) {
    console.log(`🚫 MongoDB disconnect error`)
  }
}
