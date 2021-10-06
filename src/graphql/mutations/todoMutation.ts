import ErrorMessage from '../../helpers/error'
import TodoModel, { Todo } from '../../models/TodoModel'

export const createTodo = async (root, args) => {
  const { groupName, input } = args
  const todoMaxOrder = await TodoModel.findOne({ groupName }).sort('-order')
  input.order = todoMaxOrder.order + 1
  return await TodoModel.create({ ...input, groupName })
}

export const updateTodo = async (root, args) => {
  const { todoId, groupName, order, input } = args
  // If not authenticated throw error
  const todoList = await TodoModel.find({ groupName, order: { $gte: order } })

  if (todoList.length > 0) {
    Promise.all(
      todoList.map(async (todo: Todo, index) => {
        await TodoModel.findOneAndUpdate({ _id: todo._id }, { ...todo, order: todo.order + 1 }, { new: true })
      })
    )
  }
  const newTodo = await TodoModel.findOneAndUpdate(
    { _id: todoId },
    { ...input, groupName, order: todoList.length > 0 ? order : todoList[todoList.length - 1].order + 1 },
    { new: true }
  )

  return newTodo
}

export const deleteTodo = async (root, { todoId }) => {
  const todo = await TodoModel.findById(todoId)
  if (!todo) ErrorMessage('Todo not found.')
  const todoList = await TodoModel.find({ groupName: todo.groupName, order: { $gte: todo.order } })

  if (todoList.length > 0) {
    Promise.all(
      todoList.map(async (todo: Todo, index) => {
        await TodoModel.findOneAndUpdate({ _id: todo._id }, { ...todo, order: todo.order - 1 }, { new: true })
      })
    )
  }
  const afterDeleteTodo = await TodoModel.findByIdAndRemove(todoId)
  return afterDeleteTodo
}
