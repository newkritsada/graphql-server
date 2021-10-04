import jwt from 'jsonwebtoken'
import config from '../config'
import { TOKEN_TYPE } from '../helpers/authorization'
import ErrorMessage from '../helpers/error'
import { TokenPayload } from '../helpers/interface'

const withAuth = ({ root, args, context }, next) => {
  console.log('context', context)
  const { token } = context
  if(!token)ErrorMessage('Required Authentication')
  const authToken = token.replace(/(bearer| )/gi, '')
  const decoded = <TokenPayload>jwt.decode(authToken)
  const { userId, serType, tokenType, iat, exp } = decoded
  if (iat && exp && Date.now() >= exp * 1000) {
    ErrorMessage('Token Expired.')
  }

  if (tokenType !== TOKEN_TYPE.ACCESS_TOKEN) {
    ErrorMessage('Access token ts required.')
  }
  jwt.verify(authToken, config.secretKey, (error, decoded) => {
    if (error) {
      ErrorMessage(`JWT Error: ${error.message}`)
    }
    context.user = decoded
  })
  context.loggedIn = true
  return next(root, args, context)
}

export default withAuth
