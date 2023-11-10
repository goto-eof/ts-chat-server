// Construct a schema, using GraphQL schema language
import {gql} from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(user: UserIn): UserOut
  }
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
  }
  
  input UserIn {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
  }
  
  type UserOut {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }
`;