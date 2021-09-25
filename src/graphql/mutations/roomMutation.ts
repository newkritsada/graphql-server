import RoomModel from '../../models/RoomModel'
import subscription from '../..//helpers/subscription'
import { CREATE_ROOM } from '../subscriptions/roomSubscription'

export const createRoom = async (root, { input }) => {
  subscription.publish(CREATE_ROOM)
  return await RoomModel.create(input)
}
export const updateRoom = async (root, { _id, input }) => {
  // If not authenticated throw error
  return await RoomModel.findOneAndUpdate(
    {
      _id,
    },
    input,
    {
      new: true,
    }
  )
}

export const deleteRoom = async (root, { _id }) => {
  return await RoomModel.findByIdAndRemove(_id)
}
