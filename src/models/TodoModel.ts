import mongoose, { ObjectId } from 'mongoose'

const Schema = mongoose.Schema

export interface Todo {
  _id: string
  topic: string
  detail: string
  priority: 'LOW' | 'MEDIUM' | 'HIGHT' | 'CRITICAL' | string
  startDate: Date
  dueDate: Date
  groupId: ObjectId
  order: number
}

const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGHT: 'HIGHT',
  CRITICAL: 'CRITICAL',
}

const todoSchema = new Schema<Todo>(
  {
    topic: { type: String, trim: true },
    detail: { type: String },
    priority: { type: String, trim: true, enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGHT, PRIORITY.CRITICAL] },
    startDate: { type: Date },
    dueDate: { type: Date },
    groupId: { type: Schema.Types.ObjectId },
    order: { type: Number },
  },
  { timestamps: true }
)

todoSchema.virtual('groupInfo', {
  ref: 'groups',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
})

const TodoModel = mongoose.model('todoes', todoSchema, 'todoes')

export default TodoModel
