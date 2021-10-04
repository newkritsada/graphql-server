import roomResolver from './roomResolver'
import todoResolver from './todoResolver'
import userResolver from './userResolver'

const rootResolver = {
  Query: {
    ...roomResolver.Query,
    ...userResolver.Query,
    ...todoResolver.Query,
    // Add other queries here
  },
  Mutation: {
    ...roomResolver.Mutation,
    ...userResolver.Mutation,
    ...todoResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...roomResolver.Subscription,
    ...userResolver.Subscription,
    ...todoResolver.Subscription,
    // Add other subscriptions here
  },
}

export default rootResolver
