import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import ErrorMessage from '../../helpers/error'
import ProjectModel from '../../models/ProjectModel'
import GroupModel from '../../models/GroupModel'
import TodoModel from '../../models/TodoModel'

export const createProject = async (root, args) => {
  const { input } = args
  const newProject = await ProjectModel.create({ ...input })
  await GroupModel.create([
    {
      title: 'To do',
      order: 1,
      projectId: newProject._id,
    },
    {
      title: 'In Progress',
      order: 2,
      projectId: newProject._id,
    },
    {
      title: 'Done',
      order: 3,
      projectId: newProject._id,
    },
  ])
  const project = await ProjectModel.findById(newProject._id).populate({
    path: 'groupList',
    options: { sort: { order: 1 }, populate: { path: 'todoList', options: { sort: { order: 1 } } } },
  })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: project }
}

export const updateProject = async (root, args) => {
  const { projectId, input } = args
  const oldProject = await ProjectModel.findByIdAndUpdate(projectId)
  if (!oldProject) ErrorMessage('Project not found.')

  const newProject = await ProjectModel.findByIdAndUpdate(
    projectId,
    {
      ...input,
    },
    { new: true }
  ).populate({
    path: 'groupList',
    options: { sort: { order: 1 }, populate: { path: 'todoList', options: { sort: { order: 1 } } } },
  })

  return { status: PAYLOAD_STATUS.SUCCESS, payload: newProject }
}

export const deleteProject = async (root, { projectId }) => {
  const project = await ProjectModel.findById(projectId)
  if (!project) ErrorMessage('Project not found.')

  const afterDeleteProject = await ProjectModel.findByIdAndRemove(projectId, { new: true }).populate({
    path: 'groupList',
  })
  const groupIds = afterDeleteProject.groupList.map((group) => group._id)
  await GroupModel.deleteMany({ projectId: afterDeleteProject._id })
  await TodoModel.deleteMany({ groupId: { $in: groupIds } })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: afterDeleteProject }
}
