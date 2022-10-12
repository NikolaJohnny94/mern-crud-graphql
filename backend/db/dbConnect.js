import mongoose from 'mongoose'
import colors from 'colors'

const dbConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI)
  if (connection) {
    console.log('\nMongoDB is connected'.inverse.green)
  }
}
export default dbConnect
