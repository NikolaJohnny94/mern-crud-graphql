import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} from 'graphql'
import UserType from '../types/UserType'
import UserModel from '../../models/User'

const UserQuery = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find()
      },
    },
    userBySlug: {
      type: UserType,
      args: { slug: { type: GraphQLString } },
      resolve(parent, args) {
        return UserModel.findOne({ slug: args.slug })
      },
    },
  },
})

export default UserQuery
