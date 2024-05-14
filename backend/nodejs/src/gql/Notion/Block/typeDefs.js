export const typeDefs = `#graphql
  type NotionBlock {
    object: String!
    id: String!
    parent: Parent!
    created_time: String!
    last_edited_time: String!
    created_by: CreatedBy!
    last_edited_by: LastEditedBy!
    has_children: Boolean!
    in_trash: Boolean!
    type: String!
    heading_2: Heading2!
  }

  type Parent {
    type: String!
    page_id: String!
  }

  type CreatedBy {
    object: String!
    id: String!
  }

  type LastEditedBy {
    object: String!
    id: String!
  }

  type Heading2 {
    rich_text: [RichText!]!
    color: String!
    is_toggleable: Boolean!
  }

  type RichText {
    type: String!
    text: Text!
    annotations: Annotations!
    plain_text: String!
    href: String
  }

  type Text {
    content: String!
    link: Link
  }

  type Link {
    url: String
  }

  type Annotations {
    bold: Boolean!
    italic: Boolean!
    strikethrough: Boolean!
    underline: Boolean!
    code: Boolean!
    color: String!
  }
`;
