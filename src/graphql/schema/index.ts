import { gql } from 'apollo-server-express'
import resolvers from '../resolvers/index'

const typeDefs = gql`
  type Room {
    _id: ID
    name: String
    summary: String
    description: String
    room_type: String
    maximum_nights: Int
    minimum_nights: Int
    beds: Int
    accommodates: Int
    price: Float
    cleaning_fee: Float
  }
  input RoomInput {
    name: String
    summary: String
    description: String
    room_type: String
    maximum_nights: Int
    minimum_nights: Int
    beds: Int
    accommodates: Int
    price: Float
    cleaning_fee: Float
  }

  type Query {
    room(_id: ID!): Room
    rooms: [Room]
  }
  type Mutation {
    createRoom(input: RoomInput): Room
    updateRoom(_id: ID!, input: RoomInput): Room
    deleteRoom(_id: ID!): Room
  }
  type Subscription {
    rooms: [Room]
  }
`

const schema = {
  typeDefs,
  resolvers,
}

export default schema
