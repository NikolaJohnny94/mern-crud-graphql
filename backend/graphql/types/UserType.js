import User from '../../models/User'
import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    occupation: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    slug: { type: GraphQLString },
  }),
})

export default UserType
