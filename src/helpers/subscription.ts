import { FilterFn, PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()
function resolve(key: string[], resolver: any, filter?: FilterFn) {
  return {
    resolve: async (parent, args, context) => {
      return resolver(parent, args, context)
    },
    subscribe: filter ? withFilter(() => pubsub.asyncIterator(key), filter) : pubsub.asyncIterator(key),
  }
}

function publish(key: string, payload?: any) {
  return pubsub.publish(key, payload)
}

export default { resolve, publish }
