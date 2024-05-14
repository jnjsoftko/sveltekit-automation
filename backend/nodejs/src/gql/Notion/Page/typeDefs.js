export const typeDefs = `#graphql
type NotionPage {
  object: String!
  id: String!
  created_time: String!
  created_by: User!
  last_edited_time: String!
  last_edited_by: User!
  in_trash: Boolean!
  icon: FileObject!
  cover: FileObject!
  properties: [Property]!
  parent: Parent!
  url: String!
  public_url: String!
}

type User {
  object: String!
  id: String!
}

type FileObject {
  type: String!
}

type Property {
  key: String!
  value: PropertyValue!
}

type PropertyValue {
  id: String!
}

type Parent {
  type: String!
  database_id: String
}

type Query {
    getNotionPage(database_id: String): NotionDatabase
}
`;
