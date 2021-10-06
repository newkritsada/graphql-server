import todoResolver from './todoResolver'
import userResolver from './userResolver'

const rootResolver = {
  Query: {
    ...userResolver.Query,
    ...todoResolver.Query,
    // Add other queries here
  },
  Mutation: {
    ...userResolver.Mutation,
    ...todoResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...userResolver.Subscription,
    ...todoResolver.Subscription,
    // Add other subscriptions here
  },
}

export default rootResolver
