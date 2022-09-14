import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
      email
      phoneNumber
      occupation
      slug
    }
  }
`

export const GET_USER = gql`
  query getUser($slug: String!) {
    userBySlug(slug: $slug) {
      id
      firstName
      lastName
      email
      phoneNumber
      occupation
    }
  }
`
