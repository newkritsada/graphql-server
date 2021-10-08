import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import ErrorMessage from '../../helpers/error'
import GroupModel, { Group } from '../../models/GroupModel'

export const createGroup = async (root, args) => {
  const { input } = args
  const newGroup = await GroupModel.create({ ...input })
  const group = await GroupModel.findById(newGroup._id).populate({ path: 'todoList', options: { sort: { order: 1 } } })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: group }
}

export const updateGroup = async (root, args) => {
  const { groupId, input } = args
  const oldGroup = await GroupModel.findByIdAndUpdate(groupId)
  if (!oldGroup) ErrorMessage('Group not found.')

  const newGroup = await GroupModel.findByIdAndUpdate(
    groupId,
    {
      ...input,
    },
    { new: true }
  ).populate({ path: 'todoList', options: { sort: { order: 1 } } })

  return { status: PAYLOAD_STATUS.SUCCESS, payload: newGroup }
}

export const deleteGroup = async (root, { groupId }) => {
  const group = await GroupModel.findById(groupId)
  if (!group) ErrorMessage('Group not found.')

  const afterDeleteGroup = await GroupModel.findByIdAndRemove(groupId, { new: true }).populate({
    path: 'todoList',
    options: { sort: { order: 1 } },
  })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: afterDeleteGroup }
}
