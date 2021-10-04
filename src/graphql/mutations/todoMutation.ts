import TodoModel from '../../models/TodoModel'

export const createTodo = async (root, { groupName, input }) => {
  return await TodoModel.create({ ...input, groupName })
}
export const updateTodo = async (root, { groupName, todoId, input }) => {
  // If not authenticated throw error
  return await TodoModel.findOneAndUpdate(
    {
      _id: todoId,
    },
    { ...input, groupName },
    {
      new: true,
    }
  )
}

export const deleteTodo = async (root, { todoId }) => {
  return await TodoModel.findByIdAndRemove(todoId)
}
