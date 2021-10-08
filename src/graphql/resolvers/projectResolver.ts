import { createProject, updateProject, deleteProject } from '../mutations/projectMutation'
import { getProjectList, getProjectById } from '../queries/projectQuery'

/**
 * User Queries
 */

/**
 * User Mutations
 */

export default {
  Query: { getProjectList, getProjectById },
  Mutation: {
    createProject,
    updateProject,
    deleteProject,
  },
  Subscription: {},
}
