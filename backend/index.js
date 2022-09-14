import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
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
    `Server is running on http://localhost:${process.env.PORT}/graphql`
  )
})
