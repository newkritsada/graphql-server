import groupResolver from './groupResolver'
import todoResolver from './todoResolver'
import userResolver from './userResolver'

const rootResolver = {
  Query: {
    ...userResolver.Query,
    ...todoResolver.Query,
    ...groupResolver.Query,

    // Add other queries here
  },
  Mutation: {
    ...userResolver.Mutation,
    ...todoResolver.Mutation,
    ...groupResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...userResolver.Subscription,
    ...todoResolver.Subscription,
    ...groupResolver.Subscription,
    // Add other subscriptions here
  },
}

export default rootResolver
