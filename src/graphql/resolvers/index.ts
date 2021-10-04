import roomResolver from './roomResolver'
import userResolver from './userResolver'

const rootResolver = {
  Query: {
    ...roomResolver.Query,
    ...userResolver.Query,
    // Add other queries here
  },
  Mutation: {
    ...roomResolver.Mutation,
    ...userResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...roomResolver.Subscription,
    ...userResolver.Subscription
    // Add other subscriptions here
  }
}

export default rootResolver
