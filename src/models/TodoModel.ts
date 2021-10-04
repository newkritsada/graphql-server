import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface User {
  _id: string
  detail: string
  groupName: string
}

const todoSchema = new Schema<User>({
  detail: { type: String },
  // groupId: { type: String, trim: true },
  groupName: { type: String, trim: true },
})

todoSchema.virtual('todoList', {
  ref: 'todoes',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
})

const TodoModel = mongoose.model('todoes', todoSchema, 'todoes')

export default TodoModel
