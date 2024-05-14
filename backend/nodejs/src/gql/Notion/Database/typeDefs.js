export const typeDefs = `#graphql
  scalar JSON

  type User {
    id: ID!
    object: String!
  }

  type Database {
    id: ID!
    type: String!
    database_id: ID!
  }

  type NotionDatabase {
    id: ID!
    created_time: String!
    last_edited_time: String!
    created_by: User!
    last_edited_by: User!
    cover: String
    icon: String
    parent: Database!
    archived: Boolean!
    in_trash: Boolean!
    # properties: Properties!
    properties: JSON!
    url: String!
    public_url: String
  }

  type RichText {
    type: String!
    text: RichTextContent!
    annotations: Annotations!
    plain_text: String!
    href: String
  }

  type RichTextContent {
    content: String!
    link: String
  }

  type Annotations {
    bold: Boolean!
    italic: Boolean!
    strikethrough: Boolean!
    underline: Boolean!
    code: Boolean!
    color: String!
  }

  type SelectOption {
    id: ID!
    name: String!
    color: String!
  }

  type RelationProperty {
    id: ID!
    type: String!
    relation: [ID!]!
    has_more: Boolean!
  }

  type SelectProperty {
    id: ID!
    type: String!
    select: SelectOption
  }

  type RichTextProperty {
    id: ID!
    type: String!
    rich_text: [RichText!]!
  }

  type TitleProperty {
    id: ID!
    type: String!
    title: [RichText!]!
  }

  type Query {
    notionDatabase(database_id: String): [JSON!]
  }
`;
