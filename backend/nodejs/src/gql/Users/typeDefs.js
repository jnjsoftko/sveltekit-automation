export const typeDefs = `#graphql
  type User {
    name: String
    email: String
  }

  type Query {
    allUsers: [User]
    userByName(name: String!): User
  }
`;