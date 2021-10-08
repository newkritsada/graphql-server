import { PAYLOAD_STATUS } from '../../config/payloadStatus'
import GroupModel from '../../models/GroupModel'

export const getGroupList = async (root, args) => {
  const groupList = await GroupModel.find().populate({ path: 'todoList', options: { sort: { order: 1 } } })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: groupList }
}

export const getGroupById = async (root, { groupId }) => {
  const group = await GroupModel.findById(groupId).populate({ path: 'todoList', options: { sort: { order: 1 } } })
  return { status: PAYLOAD_STATUS.SUCCESS, payload: group }
}
