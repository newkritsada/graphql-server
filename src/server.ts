import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema'
import config from './config'
const mongoose = require('mongoose')
// import mongoose from 'mongoose'
mongoose.connect(
  config.db,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (error) {
    if (error) console.log(error)
    console.log('Core database connection successful 🌞🌞🌞')
  }
)
;(async function () {
  const app = express()

  const httpServer = createServer(app)

  const schemaExcute = makeExecutableSchema(schema)

  const server = new ApolloServer({
    schema: schemaExcute,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema: schemaExcute, execute, subscribe },
    { server: httpServer }
  )

  await server.start()
  server.applyMiddleware({ app })

  httpServer.listen(config.port, () => console.log(`Server is now running on http://localhost:${config.port}/graphql`))
})()
