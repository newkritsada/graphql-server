import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel, { User } from '../../models/UserModel'
import ErrorMessage from '../../helpers/error'
import { checkTokenExpired, generateToken, TOKEN_TYPE } from '../../helpers/authorization'
import { TokenPayload } from '../../helpers/interface'

export const register = async (root, args) => {
  const {
    input: { username, password, confirmPassword },
  } = args
  if (password !== confirmPassword) ErrorMessage('password not match.')
  const dupUsername = await UserModel.findOne({ username: username })
  if (dupUsername) ErrorMessage('User already exit. Please try again.')

  const newUser = await UserModel.create({
    username,
    password: await bcrypt.hash(password, 8),
  })

  if (!newUser) ErrorMessage('Can not save to database.')
  return newUser
}

export const login = async (root, args) => {
  const { username, password } = args
  const user: User = await UserModel.findOne({ username })
  if (!user) ErrorMessage('User not found!')
  const match = await bcrypt.compare(password, user.password)
  if (!match) ErrorMessage('Password is incorrect. Please try again.')
  const [token, refreshToken] = await generateToken({ userId: user._id, username })
  delete user.password
  return {
    token: {
      accessToken: token,
      refreshToken: refreshToken,
    },
    user,
  }
}

export const refreshToken = async (root, args) => {
  const decode = <TokenPayload>jwt.decode(args.refreshToken)
  const isTokenExpired = checkTokenExpired(decode)
  if (isTokenExpired) {
    throw ErrorMessage('Token Expired.')
  }
  if (decode.tokenType !== TOKEN_TYPE.REFRESH_TOKEN) {
    ErrorMessage('Required Refresh token')
  }

  const [token, refreshToken] = await generateToken(decode)

  return {
    accessToken: token,
    refreshToken: refreshToken,
  }
}

export const editProfile = async (root, args, context) => {
  const { input } = args
  const { user, loggedIn } = context
  if (!loggedIn) ErrorMessage('you must be logged in')
  const userInfo = await UserModel.findById(user.userId)
  if (!userInfo) ErrorMessage('User not found')

  const newUser = await UserModel.findByIdAndUpdate(user.userId, input)

  return newUser
}
