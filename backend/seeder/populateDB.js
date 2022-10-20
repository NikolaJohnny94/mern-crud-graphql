import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'
import { config } from 'dotenv'
import slugify from 'slugify'
import colors from 'colors'
import dbConnect from '../db/dbConnect'
import UserModel from '../models/User'
import User from '../utils/User'
import countingUserDocuments from '../utils/countingUserDocuments'

config({ path: path.resolve(__dirname, '../', '.env') })

dbConnect()

const populateDB = () => {
  let users = []

  const getUsers = () => {
    return users
  }

  const addToUsersArray = (user) => {
    users.push(user)
  }

  const saveToDB = async (data) => {
    await UserModel.insertMany(data)
  }

  fs.createReadStream(path.resolve(__dirname, '../', 'files', 'Users.csv'))
    .pipe(csv())
    .on('error', (error) => console.error(error))
    .on('data', (payload) => {
      addToUsersArray(
        new User(
          payload['First Name'],
          payload['Last Name'],
          payload['Occupation'],
          payload['Email Address'],
          payload['Phone Number'],
          slugify(
            `${payload['First Name']} ${payload['Last Name']} ${Math.round(
              Math.random() * 1e16
            )}`,
            { lower: true }
          )
        )
      )
    })
    .on('end', () => {
      try {
        Promise.all(getUsers()).then((values) => saveToDB(values))
        console.log('\nDatabase is successfully populated'.inverse.blue)
      } catch (e) {
        console.error(e)
      }
    })
}

const populateIfThereAreNoUsers = async () => {
  const totalUsers = await countingUserDocuments()
  if (totalUsers === 0) {
    populateDB()
  } else {
    console.log('\nThere are already users in the database'.inverse.yellow)
  }
}

populateIfThereAreNoUsers()
