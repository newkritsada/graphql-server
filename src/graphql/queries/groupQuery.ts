import { PAYLOAD_STAATUS } from '../../config/payloadStatus'
import GroupModel from '../../models/GroupModel'

export const getGroupList = async (root, args) => {
  const groupList = await GroupModel.find().populate('todoList')
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: groupList }
}

export const getGroupById = async (root, { groupId }) => {
  const group = await GroupModel.findById(groupId).populate('todoList')
  return { status: PAYLOAD_STAATUS.SUCCESS, payload: group }
}
