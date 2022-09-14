import { GraphQLSchema } from 'graphql'
import UserQuery from '../queries/UserQuery'
import UserMutation from '../mutations/UserMutation'

const schema = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
})

export default schema
