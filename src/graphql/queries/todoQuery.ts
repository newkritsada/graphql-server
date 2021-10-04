import TodoModel from '../../models/TodoModel'

export const getTodoList = async (root, { groupName }) => {
  if (groupName) return await TodoModel.find({ groupName }).sort({ updatedAt: -1 })
  return await TodoModel.find().sort({ updatedAt: -1 })
}

export const getTodoById = async (root, { todoId }) => {
  return await TodoModel.findById(todoId)
}
