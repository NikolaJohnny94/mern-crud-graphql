import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation addNewUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $occupation: String!
    $phoneNumber: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      occupation: $occupation
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      email
      occupation
      phoneNumber
      slug
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $occupation: String!
    $phoneNumber: String!
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      occupation: $occupation
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      email
      occupation
      phoneNumber
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
