import mongoose from 'mongoose'

let connect: any

async function connectToMongoDB() {
  try {
    const dbUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@crudcluster.o87rz3b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    // const dbUrl = process.env.MONGO_URI
    if (!dbUrl) {
      throw new Error('❌ MONGO_URI environment variable is not defined')
    }

    mongoose.set('strictQuery', true)

    connect = await mongoose.connect(dbUrl as string)

    console.log(`✅ Connected to MongoDB`)
  } catch (error: any) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`)
    throw error
  } finally {
    // const db = connect.connection.db
    // await db.collection('users').updateMany({}, { $unset: { __v: 1 } })
  }
}

export const dbService = { connectToMongoDB }
