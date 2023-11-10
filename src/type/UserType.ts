// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(user: UserIn): User
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }
  
  input UserIn {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }
`;