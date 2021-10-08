import projectResolver from './projectResolver'
import groupResolver from './groupResolver'
import todoResolver from './todoResolver'
import userResolver from './userResolver'

const rootResolver = {
  Query: {
    ...userResolver.Query,
    ...todoResolver.Query,
    ...groupResolver.Query,
    ...projectResolver.Query,

    // Add other queries here
  },
  Mutation: {
    ...userResolver.Mutation,
    ...todoResolver.Mutation,
    ...groupResolver.Mutation,
    ...projectResolver.Mutation,
    // Add other mutations here
  },
  Subscription: {
    ...userResolver.Subscription,
    ...todoResolver.Subscription,
    ...groupResolver.Subscription,
    ...projectResolver.Subscription,
    // Add other subscriptions here
  },
}

export default rootResolver
