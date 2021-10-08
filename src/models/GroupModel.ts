import mongoose, { ObjectId } from 'mongoose'

const Schema = mongoose.Schema

export interface Group {
  _id: string
  title: string
  projectId: ObjectId
}

const groupSchema = new Schema<Group>(
  {
    title: { type: String },
    projectId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
)

groupSchema.virtual('todoList', {
  ref: 'todoes',
  localField: '_id',
  foreignField: 'groupId',
})

const GroupModel = mongoose.model('groups', groupSchema, 'groups')

export default GroupModel
