import { gql } from 'apollo-server'

const typeDefs = gql`
  type GroupType {
    _id: ID
    title: String
    order: Number
    todoList: [TodoType]
    projectId: String
    projectDetail: ProjectType
    createdAt: Date
    updatedAt: Date
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
