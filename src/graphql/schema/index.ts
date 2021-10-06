import { gql } from 'apollo-server'
import resolvers from '../resolvers/index'
import user from './user'
import todo from './todo'

const intitialType = gql`
  scalar Date

  enum PayloadStatus {
    SUCCESS
    ERROR
  }

  type Query {
    _dummy: String
  }

  type Mutation {
    _dummy: String
  }

  type Subscription {
    _dummy: String
  }
`

const typeDefs = [intitialType, user, todo]

const schema = {
  typeDefs,
  resolvers,
}

export default schema
