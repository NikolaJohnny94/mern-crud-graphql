import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import dbConnect from './db/dbConnect'
import { graphqlHTTP } from 'express-graphql'
import schema from './graphql/schemas/schema'

config()
dbConnect()

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)

app.listen(process.env.PORT, () => {
  console.log(
    `\nServer is running on ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.ENDPOINT}`
      .inverse.yellow
  )
})
