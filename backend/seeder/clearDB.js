import path from 'path'
import { config } from 'dotenv'
import colors from 'colors'
import dbConnect from '../db/dbConnect'
import UserModel from '../models/User'
import countingUserDocuments from '../utils/countingUserDocuments'

config({ path: path.resolve(__dirname, '../', '.env') })

dbConnect()

const deleteUsersFromDB = async () => {
  try {
    await UserModel.deleteMany()
    console.log('\nData succesfully deleted from the database'.inverse.red)
    process.exit(0)
  } catch (e) {
    console.error(e)
  }
}

const deleteIfDBHaveUsers = async () => {
  const totalUsers = await countingUserDocuments()
  if (totalUsers !== 0) {
    deleteUsersFromDB()
  } else {
    console.log('\nThe database is already empty'.inverse.yellow)
  }
}

deleteIfDBHaveUsers()
