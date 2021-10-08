import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import ProjectModel from '../../models/ProjectModel'

export const getProjectList = async (root, args) => {
  const projectList = await ProjectModel.find().populate({
    path: 'groupList',
    options: { sort: { updateAt: 1 }, populate: { path: 'todoList', options: { sort: { order: 1 } } } },
  })

  return { status: PAYLOAD_STATUS.SUCCESS, payload: projectList }
}

export const getProjectById = async (root, { projectId }) => {
  const project = await ProjectModel.findById(projectId)
    .populate({
    path: 'groupList',
    options: { sort: { updateAt: 1 }, populate: { path: 'todoList', options: { sort: { order: 1 } } } },
  })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: project }
}
