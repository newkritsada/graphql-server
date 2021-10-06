import { PAYLOAD_STAATUS } from '../../config/payloadStatus'
import TodoModel from '../../models/TodoModel'

export const getTodoList = async (root, { groupName }) => {
  let todoList
  if (groupName) todoList = await TodoModel.find({ groupName }).sort({ order: 1 })
  else todoList = await TodoModel.find().sort({ order: 1 })
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: todoList }
}

export const getTodoById = async (root, { todoId }) => {
  const todo = await TodoModel.findById(todoId)
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: todo }
}
