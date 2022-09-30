import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

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
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
})

export default UserType
