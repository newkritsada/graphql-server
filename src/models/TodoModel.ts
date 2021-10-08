import mongoose, { ObjectId } from 'mongoose'

const Schema = mongoose.Schema

export interface Todo {
  _id: string
  topic: string
  detail: string
  piority: 'LOW' | 'MEDIUM' | 'HIGHT' | 'CRITICAL' | string
  startDate: Date
  endDate: Date
  groupName: string
  groupId: ObjectId
  order: number
}

const PIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
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
  groupId: { type: Schema.Types.ObjectId },
  order: { type: Number },
})

todoSchema.virtual('groupInfo', {
  ref: 'groups',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
})

const TodoModel = mongoose.model('todoes', todoSchema, 'todoes')

export default TodoModel
