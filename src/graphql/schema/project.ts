import { gql } from 'apollo-server'

const typeDefs = gql`
  type ProjectType {
    _id: ID
    name: String
    description: String
    category: String
    groupList: [GroupType]
    createdAt: Date
    updatedAt: Date
  }

  type PayloadProject {
    status: PayloadStatus
    payload: ProjectType
  }

  type PayloadProjectList {
    status: PayloadStatus
    payload: [ProjectType]
  }

  input ProjectInput {
    name: String
    description: String
    category: String
  }

  type Query {
    getProjectList(todoTopic: String, priority: PriorityEnum): PayloadProjectList
    getProjectById(projectId: String!, todoTopic: String, priority: PriorityEnum): PayloadProject
  }

  type Mutation {
    createProject(input: ProjectInput): PayloadProject
    updateProject(projectId: String!, input: ProjectInput): PayloadProject
    deleteProject(projectId: String!): PayloadProject
  }
`

export default typeDefs
