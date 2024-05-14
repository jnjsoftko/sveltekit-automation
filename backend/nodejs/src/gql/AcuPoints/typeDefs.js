export const typeDefs = `#graphql
  type AcuPoint {
    name_ko: String
    code: String
  }

  type Query {
    allAcuPoints: [AcuPoint]
    acuPointsByName(name: String!): AcuPoint
  }

  input AcuPointInput {
    name_ko: String
    code: String
  }

  type Mutation {
    addAcuPoint(input: AcuPointInput): AcuPoint
  }
`;