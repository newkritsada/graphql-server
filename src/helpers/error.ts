import { ApolloError } from 'apollo-server-errors'

const ErrorMessage = (message: string) => {
  throw new ApolloError(message)
}

export default ErrorMessage
