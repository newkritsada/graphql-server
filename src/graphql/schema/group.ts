import { gql } from 'apollo-server'

const typeDefs = gql`

  type GroupType {
    _id: ID
    title: String
    todoList: [TodoType]
  }

  type PayloadGroup {
    status: PayloadStatus
    payload: GroupType
  }

  type PayloadGroupList {
    status: PayloadStatus
    payload: [GroupType]
  }

  input GroupInput {
    title: String
  }

  type Query {
    getGroupList: PayloadGroupList
    getGroupById(groupId: String): PayloadGroup
  }

  type Mutation {
    createGroup(input: GroupInput): PayloadGroup
    updateGroup(groupId: String!, input: GroupInput): PayloadGroup
    deleteGroup(groupId: String!): PayloadGroup
  }
`

export default typeDefs
