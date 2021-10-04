import resolvers from '../resolvers/index'
import room from './room'
import user from './user'
import todo from './todo'

const typeDefs = [room, user, todo]

const schema = {
  typeDefs,
  resolvers,
}

export default schema
