import { gql } from 'apollo-server'

const typeDefs = gql`
  enum PriorityEnum {
    LOW
    MEDIUM
    HIGHT
    CRITICAL
  }

  type TodoType {
    _id: ID
    topic: String
    detail: String
    priority: PriorityEnum
    startDate: Date
    endDate: Date
    groupId: String
    groupInfo: GroupType
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

  input TodoInput {
    topic: String
    detail: String
    priority: PriorityEnum
    startDate: Date
    endDate: Date
  }

  type Query {
    getTodoList(groupId: String): PayloadTodoList
    getTodoById(todoId: String): PayloadTodo
  }

  type Mutation {
    createTodo(groupId: String!, input: TodoInput): PayloadTodo
    updateTodo(todoId: String!, groupId: String!, order: Number!, input: TodoInput): PayloadTodo
    deleteTodo(todoId: String!): PayloadTodo
  }
`

export default typeDefs
