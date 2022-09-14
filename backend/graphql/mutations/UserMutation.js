import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql'
import UserType from '../types/UserType'
import UserModel from '../../models/User'

const UserMutation = new GraphQLObjectType({
  name: 'UserMutation',

  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        occupation: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new UserModel({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          occupation: args.occupation,
          phoneNumber: args.phoneNumber,
        })
        return user.save()
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        occupation: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
      },
      resolve(parent, args) {
        return UserModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              phoneNumber: args.phoneNumber,
              occupation: args.occupation,
            },
          },
          { new: true }
        )
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return UserModel.findByIdAndRemove(args.id)
      },
    },
  },
})

export default UserMutation
