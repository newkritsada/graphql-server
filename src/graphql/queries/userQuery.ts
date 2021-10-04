import UserModel from '../../models/UserModel'
import ErrorMessage from '../../helpers/error'

export const getMyInfo = async (root, { _id }, context) => {
  const { user, loggedIn } = context
  console.log("User = ",user)
  if (!loggedIn) ErrorMessage('you must be logged in')
  const userInfo = await UserModel.findById(user.userId)
  if (!userInfo) ErrorMessage('User not found')
  return userInfo
}

export const getUsers = async (root, { _id }, context) => {
  console.log('context = ', context)

  return []
}
