import RoomModel from '../../models/RoomModel'

export const rooms = async () => {
  return await RoomModel.find()
}

export const room = async (root, { _id }) => {
  return await RoomModel.findById(_id);
}