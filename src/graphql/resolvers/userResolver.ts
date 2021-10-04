import { getMyInfo } from './../queries/userQuery'
import { register, login, refreshToken, editProfile } from './../mutations/userMutation'
import withAuth from '../../middleware/withAuth'

/**
 * User Queries
 */

/**
 * User Mutations
 */

export default {
  Query: { getMyInfo: (root, args, context) => withAuth({ root, args, context }, getMyInfo) },
  Mutation: {
    register,
    login,
    refreshToken,
    editProfile: (root, args, context) => withAuth({ root, args, context }, editProfile),
  },
  Subscription: {},
}
