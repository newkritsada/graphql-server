import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import ErrorMessage from '../../helpers/error'
import TodoModel, { Todo } from '../../models/TodoModel'

export const createTodo = async (root, args) => {
  const { groupId, input } = args
  if (input.startDate && input.dueDate) {
    if (input.startDate > input.dueDate) ErrorMessage('startDate must not be more than dueDate')
  }
  const todoMaxOrder = await TodoModel.findOne({ groupId }).sort('-order')
  input.order = todoMaxOrder ? todoMaxOrder.order + 1 : 1
  const newTodo = await TodoModel.create({ ...input, groupId })
  const todo = await TodoModel.findById(newTodo._id).populate('groupInfo')
  return { status: PAYLOAD_STATUS.SUCCESS, payload: todo }
}

export const updateTodo = async (root, args) => {
  const { todoId, groupId, order, input } = args
  const oldTodo = await TodoModel.findByIdAndUpdate(todoId)
  if (!oldTodo) ErrorMessage('Todo not found.')
  //Validate Time

  if (groupId === oldTodo.groupId) {
    if (order > oldTodo.order) {
      const todoList = await TodoModel.find({
        groupId,
        order: { $gt: oldTodo.order, $lte: order },
      })

      if (todoList.length > 0) {
        Promise.all(
          todoList.map(async (todo: Todo) => {
            return await TodoModel.findByIdAndUpdate(
              todo._id,
              {
                order: todo.order - 1,
              },
              { new: true }
            )
          })
        )
      }
    } else if (order < oldTodo.order) {
      const todoList = await TodoModel.find({
        groupId,
        order: { $gte: order, $lt: oldTodo.order },
      })
      if (todoList.length > 0) {
        Promise.all(
          todoList.map(async (todo: Todo) => {
            return await TodoModel.findByIdAndUpdate(
              todo._id,
              {
                order: todo.order + 1,
              },
              { new: true }
            )
          })
        )
      }
    }
  } else {
    //change new group
    const todoListNewGroup = await TodoModel.find({
      groupId,
      order: { $gte: order },
    })

    if (todoListNewGroup.length > 0) {
      Promise.all(
        todoListNewGroup.map(async (todo: Todo) => {
          return await TodoModel.findByIdAndUpdate(
            todo._id,
            {
              order: todo.order + 1,
            },
            { new: true }
          )
        })
      )
    }

    //change old group
    const todoListOldGroup = await TodoModel.find({ groupId: oldTodo.groupId, order: { $gt: oldTodo.order } })
    Promise.all(
      todoListOldGroup.map(async (todo: Todo) => {
        return await TodoModel.findByIdAndUpdate(
          todo._id,
          {
            order: todo.order - 1,
          },
          { new: true }
        )
      })
    )
  }
  const newTodoList = await TodoModel.findOne({ groupId }).sort('-order')

  const newTodo = await TodoModel.findByIdAndUpdate(
    todoId,
    {
      ...input,
      groupId,
      order:
        newTodoList && !newTodoList._id.equals(oldTodo._id)
          ? order > newTodoList.order
            ? newTodoList.order + 1
            : order
          : 1,
    },
    { new: true }
  ).populate('groupInfo')

  return { status: PAYLOAD_STATUS.SUCCESS, payload: newTodo }
}

export const deleteTodo = async (root, { todoId }) => {
  const todo = await TodoModel.findById(todoId)
  if (!todo) ErrorMessage('Todo not found.')
  const todoList = await TodoModel.find({ groupId: todo.groupId, order: { $gt: todo.order } })

  if (todoList.length > 0) {
    Promise.all(
      todoList.map(async (todo: Todo, index) => {
        await TodoModel.findOneAndUpdate({ _id: todo._id }, { ...todo, order: todo.order - 1 }, { new: true })
      })
    )
  }
  const afterDeleteTodo = await TodoModel.findByIdAndRemove(todoId, { new: true }).populate('groupInfo')
  return { status: PAYLOAD_STATUS.SUCCESS, payload: afterDeleteTodo }
}
