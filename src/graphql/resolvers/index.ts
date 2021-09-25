import roomResolver from './roomResolver'

const rootResolver = {
  Query: {
    ...roomResolver.Query,
    // Add other queries here
  },
  Mutation: {
    ...roomResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...roomResolver.Subscription
    // Add other subscriptions here
  }
}

export default rootResolver
