import { gql } from 'apollo-server'

const typeDefs = gql`
  enum PiorityEnum {
    LOW
    MEDIUM
    HIGHT
    CRITICAL
  }

  type GroupType {
    _id: ID
    title: String
  }

  type TodoType {
    _id: ID
    topic: String
    detail: String
    piority: PiorityEnum
    startDate: Date
    endDate: Date
    groupName: String
    order: Number
  }

  type PayloadGroup {
    status: PayloadStatus
    payload: GroupType
  }

  type PayloadTodo {
    status: PayloadStatus
    payload: TodoType
  }

  type PayloadTodoList {
    status: PayloadStatus
    payload: [TodoType]
  }

  input GroupInput {
    title: String
  }

  input TodoInput {
    topic: String
    detail: String
    piority: PiorityEnum
    startDate: Date
    endDate: Date
  }

  type Query {
    getTodoList(groupName: String): PayloadTodoList
    getTodoById(todoId: String): PayloadTodo
  }

  type Mutation {
    createTodo(groupName: String!, input: TodoInput): PayloadTodo
    updateTodo(todoId: String!, groupName: String!, order: Number!, input: TodoInput): PayloadTodo
    deleteTodo(todoId: String!): PayloadTodo
  }
`

export default typeDefs
