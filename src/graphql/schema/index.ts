import { gql } from 'apollo-server'
import resolvers from '../resolvers/index'
import user from './user'
import todo from './todo'
import group from './group'
import project from './project'

const intitialType = gql`
  scalar Date
  scalar Number

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

const typeDefs = [intitialType, user, todo, group,project]

const schema = {
  typeDefs,
  resolvers,
}

export default schema
