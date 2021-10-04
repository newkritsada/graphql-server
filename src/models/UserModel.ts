import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface User {
  _id: string
  username: string
  password: string
  name: string
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
})

const UserModel = mongoose.model('users', userSchema, 'users')

export default UserModel
