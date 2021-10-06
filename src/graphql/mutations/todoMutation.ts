import { PAYLOAD_STAATUS } from '../../config/payloadStatus'
import ErrorMessage from '../../helpers/error'
import TodoModel, { Todo } from '../../models/TodoModel'

export const createTodo = async (root, args) => {
  const { groupName, input } = args
  if (input.startDate && input.endDate) {
    if (input.startDate > input.endDate) ErrorMessage('startDate must not be more than endDate')
  }
  const todoMaxOrder = await TodoModel.findOne({ groupName }).sort('-order')
  input.order = todoMaxOrder ? todoMaxOrder.order + 1 : 1
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: await TodoModel.create({ ...input, groupName }) }
}

export const updateTodo = async (root, args) => {
  const { todoId, groupName, order, input } = args
  const oldTodo = await TodoModel.findByIdAndUpdate(todoId)
  if (!oldTodo) ErrorMessage('Todo not found.')
  //Validate Time
  if (input?.startDate && input?.endDate) {
    if (input?.startDate > input?.endDate) ErrorMessage('startDate must not be more than endDate')
  }
  if (input?.startDate && !input?.endDate) {
    if (input?.startDate > oldTodo.endDate) ErrorMessage('startDate must not be more than endDate')
  }
  if (input?.endDate && !input?.startDate) {
    if (input?.endDate < oldTodo.startDate) ErrorMessage('endDate must not be less than startDate')
  }

  if (groupName === oldTodo.groupName) {
    if (order > oldTodo.order) {
      const todoList = await TodoModel.find({
        groupName,
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
    }
    if (order < oldTodo.order) {
      const todoList = await TodoModel.find({
        groupName,
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
      groupName,
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
    const todoListOldGroup = await TodoModel.find({ groupName: oldTodo.groupName, order: { $gt: oldTodo.order } })
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
  const newTodoList = await TodoModel.findOne({ groupName }).sort('-order')

  const newTodo = await TodoModel.findByIdAndUpdate(
    todoId,
    {
      ...input,
      groupName,
      order:
        newTodoList && !newTodoList._id.equals(oldTodo._id)
          ? order > newTodoList.order
            ? newTodoList.order + 1
            : order
          : 1,
    },
    { new: true }
  )

  return { status: PAYLOAD_STAATUS.SUCCESS, payload: newTodo }
}

export const deleteTodo = async (root, { todoId }) => {
  const todo = await TodoModel.findById(todoId)
  if (!todo) ErrorMessage('Todo not found.')
  const todoList = await TodoModel.find({ groupName: todo.groupName, order: { $gt: todo.order } })

  if (todoList.length > 0) {
    Promise.all(
      todoList.map(async (todo: Todo, index) => {
        await TodoModel.findOneAndUpdate({ _id: todo._id }, { ...todo, order: todo.order - 1 }, { new: true })
      })
    )
  }
  const afterDeleteTodo = await TodoModel.findByIdAndRemove(todoId, { new: true })
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: afterDeleteTodo }
}
