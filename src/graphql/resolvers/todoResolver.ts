import { createTodo, updateTodo, deleteTodo } from './../mutations/todoMutation'
import { getTodoList,getTodoById } from './../queries/todoQuery'

/**
 * User Queries
 */

/**
 * User Mutations
 */

export default {
  Query: { getTodoList,getTodoById },
  Mutation: {
    createTodo,
    updateTodo,
    deleteTodo,
  },
  Subscription: {},
}
