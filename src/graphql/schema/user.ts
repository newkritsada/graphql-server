import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    username: String
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  type UserLogin {
    user: User
    token: Token
  }

  input Register {
    username: String!
    password: String!
    confirmPassword: String!
  }

  input EditProfile {
    name: String
  }

  type Query {
    getMyInfo: User
  }

  type Mutation {
    register(input: Register): User
    login(username: String!, password: String!): UserLogin
    refreshToken(refreshToken: String!): Token
    editProfile(input: EditProfile): User
  }
`

export default typeDefs
