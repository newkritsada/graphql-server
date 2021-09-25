import { rooms as roomsSubscription } from '../subscriptions/roomSubscription'
import { room, rooms } from '../queries/roomQuery'
import { createRoom, updateRoom, deleteRoom } from '../mutations/roomMutation'
import subscription from '../../helpers/subscription'
import { CREATE_ROOM } from '../subscriptions/roomSubscription'

/**
 * User Queries
 */

/**
 * User Mutations
 */

export default {
  Query: { room, rooms },
  Mutation: {
    createRoom,
    updateRoom,
    deleteRoom,
  },
  Subscription: {
    rooms: subscription.resolve([CREATE_ROOM], roomsSubscription),
  },
}
