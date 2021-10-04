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

// -------- example --------
// ** payload follow from    subscription.publish(CREATE_NOTIFICATION, { subscriber: to })
// export const filterSubscription = (payload, variables, context) => {
//   * subscriber = [_id,_id]
//   * userId user use this query
//   const { subscriber } = payload
//   return subscriber.includes(userId)
// }

export default { resolve, publish }
