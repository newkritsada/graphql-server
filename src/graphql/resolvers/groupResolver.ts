import { createGroup, updateGroup, deleteGroup } from '../mutations/groupMutation'
import { getGroupList, getGroupById } from '../queries/groupQuery'

/**
 * User Queries
 */

/**
 * User Mutations
 */

export default {
  Query: { getGroupList, getGroupById },
  Mutation: {
    createGroup,
    updateGroup,
    deleteGroup,
  },
  Subscription: {},
}
