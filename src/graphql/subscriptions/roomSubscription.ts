import RoomModel from "../../models/RoomModel"


export const CREATE_ROOM = 'CREATE_ROOM'

export const rooms = async (rootValue, args, context, info) => {
  return await RoomModel.find()
}
