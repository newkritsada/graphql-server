import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface User {
  _id: string
  title: string
}

const groupSchema = new Schema<User>({
  title: { type: String },
})

groupSchema.virtual('todoList', {
  ref: 'todoes',
  localField: '_id',
  foreignField: 'groupId',
})

const GroupModel = mongoose.model('groups', groupSchema, 'groups')

export default GroupModel
