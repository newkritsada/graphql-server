import jwt from 'jsonwebtoken'
import resolvers from '../resolvers/index'
import room from './room'
import user from './user'
import { TOKEN_TYPE } from './../../helpers/authorization'
import ErrorMessage from './../../helpers/error'
import { TokenPayload } from './../../helpers/interface'
import config from './../..//config'

const typeDefs = [room, user]

const schema = {
  typeDefs,
  resolvers,
  
}

export default schema
