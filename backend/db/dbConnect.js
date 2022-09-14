import mongoose from 'mongoose'

const dbConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI)
  if (connection) {
    console.log('MongoDB is connected')
  }
}
export default dbConnect
