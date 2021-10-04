import { gql } from 'apollo-server'

const typeDefs = gql`
  enum PayloadStatus {
    SUCCESS
    ERROR
  }

  type Group {
    _id: ID
    title: String
  }

  type TodoType {
    _id: ID
    detail: String
    groupName: String
  }

  type PayloadGroup {
    status: PayloadStatus
    payload: Group
  }

  type PayloadTodo {
    status: PayloadStatus
    payload: [TodoType]
  }

  input GroupInput {
    title: String
  }

  input TodoInput {
    detail: String
  }

  type Query {
    getTodoList(groupName: String): [TodoType]
    getTodoById(todoId: String): TodoType
  }

  type Mutation {
    createTodo(groupName: String!, input: TodoInput): TodoType
    updateTodo(todoId: String!, groupName: String!, input: TodoInput): TodoType
    deleteTodo(todoId: String!): TodoType
  }
`

export default typeDefs
