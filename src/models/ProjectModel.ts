import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Project {
  _id: string
  name: string
  description: string
  category: string
}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, trim: true },
    description: { type: String },
    category: { type: String },
  },
  { timestamps: true }
)

projectSchema.virtual('groupList', {
  ref: 'groups',
  localField: '_id',
  foreignField: 'projectId',
})

const ProjectModel = mongoose.model('projects', projectSchema, 'projects')

export default ProjectModel
