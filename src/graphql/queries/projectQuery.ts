import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import ProjectModel from '../../models/ProjectModel'

export const getProjectList = async (root, args) => {
  const { todoTopic, todoPriority } = args
  const projectList = await ProjectModel.find().populate({
    path: 'groupList',
    options: {
      sort: { order: 1 },
      populate: {
        path: 'todoList',
        match: todoPriority
          ? { topic: { $regex: `.*${todoTopic ? todoTopic : ''}.*`, $options: 'i' }, priority: todoPriority }
          : { topic: { $regex: `.*${todoTopic ? todoTopic : ''}.*`, $options: 'i' } },
        options: {
          sort: { order: 1 },
        },
      },
    },
  })

  return { status: PAYLOAD_STATUS.SUCCESS, payload: projectList }
}

export const getProjectById = async (root, { projectId, todoTopic, todoPriority }) => {
  const project = await ProjectModel.findById(projectId).populate({
    path: 'groupList',
    options: {
      sort: { order: 1 },
      populate: {
        path: 'todoList',
        match: todoPriority
          ? { topic: { $regex: `.*${todoTopic ? todoTopic : ''}.*`, $options: 'i' }, priority: todoPriority }
          : { topic: { $regex: `.*${todoTopic ? todoTopic : ''}.*`, $options: 'i' } },
        options: {
          sort: { order: 1 },
        },
      },
    },
  })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: project }
}
