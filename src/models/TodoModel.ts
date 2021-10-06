import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Todo {
  _id: string
  topic: string
  detail: string
  piority: 'LOW' | 'MEDIUM' | 'HIGHT' | 'CRITICAL' | string
  startDate: Date
  endDate: Date
  groupName: string
  order: number
}

const PIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MIDIUM',
  HIGHT: 'HIGHT',
  CRITICAL: 'CRITICAL',
}

const todoSchema = new Schema<Todo>({
  topic: { type: String, trim: true },
  detail: { type: String },
  piority: { type: String, trim: true, enum: [PIORITY.LOW, PIORITY.MEDIUM, PIORITY.HIGHT, PIORITY.CRITICAL] },
  startDate: { type: Date },
  endDate: { type: Date },
  // groupId: { type: String, trim: true },
  groupName: { type: String, trim: true },
  order: { type: Number },
})

todoSchema.virtual('todoList', {
  ref: 'todoes',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
})

const TodoModel = mongoose.model('todoes', todoSchema, 'todoes')

export default TodoModel
