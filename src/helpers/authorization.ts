import jwt from 'jsonwebtoken'
import { GenerateToken } from './interface'
import config from '../config'

export const TOKEN_TYPE = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
}

export const generateToken = async (payload: GenerateToken) => {
  let expiration = {
    accessTime: config.accessTokenExpired,
    refreshTime: config.refreshTokenExpired,
  }

  const jwtKey = config.secretKey
  const accessExpiresIn = {
    expiresIn: expiration.accessTime,
  }
  const refreshExpiresIn = {
    expiresIn: expiration.refreshTime,
  }
  const token = jwt.sign(
    { ...payload, tokenType: TOKEN_TYPE.ACCESS_TOKEN },
    jwtKey,
    expiration.accessTime === '0' ? {} : accessExpiresIn
  )
  const refreshToken = jwt.sign(
    { ...payload, tokenType: TOKEN_TYPE.REFRESH_TOKEN },
    jwtKey,
    expiration.refreshTime === '0' ? {} : refreshExpiresIn
  )

  return [token, refreshToken]
}

export function checkTokenExpired(decode) {
  const { exp } = decode
  if (exp && exp * 1000 < Date.now()) return true
  return false
}
