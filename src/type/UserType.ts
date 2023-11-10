// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(user: UserIn): Boolean!
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
  }
  
  input UserIn {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
  }
`;