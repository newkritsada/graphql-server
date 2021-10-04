import jwt from 'jsonwebtoken'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql/schema'
import config from './config'
import { TokenPayload } from './helpers/interface'
import ErrorMessage from './helpers/error'
import { TOKEN_TYPE } from './helpers/authorization'
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
    context: ({ req }) => {
      // get the user token from the headers

      const token = req.headers.authorization || req.headers.Authorization || ''
      let loggedIn = false
      let user
      // console.log('context', token)
      return { loggedIn, user, token }
    },
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema: schemaExcute, execute, subscribe },
    { server: httpServer }
  )

  await server.start()
  server.applyMiddleware({ path:"/graphql",app })

  httpServer.listen(config.port, () => console.log(`Server is now running on http://localhost:${config.port}/graphql`))
})()
