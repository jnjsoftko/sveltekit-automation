## notion

https://github.com/graphql-api/graphql-api-notion

https://github.com/karadalex/nextjs-notion-graphql

```
const { Client } = require('@notionhq/client');

// Notion 클라이언트 초기화
const notion = new Client({ auth: '내부_통합_토큰' });

// 데이터베이스 ID
const databaseId = 'DATABASE_ID';

// 필터 및 정렬 옵션 정의
const listOptions = {
  filter: {
    property: 'Status',
    status: {
      equals: 'Active'
    }
  },
  sorts: [
    {
      property: 'Created',
      direction: 'descending'
    }
  ]
};

// 데이터베이스 쿼리 실행
notion.databases.query({ database_id: databaseId, ...listOptions })
  .then(res => {
    const pages = res.results.map(page => {
      return {
        id: page.id,
        name: page.properties.Name.title[0].plain_text,
        description: page.properties.Description.rich_text[0].plain_text
      }
    });
    console.log(pages);
  })
  .catch(err => {
    console.error(err);
  });
```

scalar JSON

type Page {
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
properties: JSON!
url: String!
public_url: String
}

type Query {
notionDatabase(database_id: ID!): Page
}

type PageResolver {
content_01Token(properties: JSON!): String
}
GraphQL 스키마에 PageResolver 타입을 추가하고, content_01Token 필드를 정의합니다. 이 필드는 properties 인수로 전달되는 JSON 데이터에서 원하는 값을 추출하여 반환합니다.
그리고 resolver 함수를 다음과 같이 구현합니다:
javascriptCopy codeconst resolvers = {
PageResolver: {
content_01Token: (parent, args) => {
const { properties } = parent;
const content = properties['_01Token'].rich_text[0].text.content;
return content;
}
}
}
이렇게 하면 다음과 같이 쿼리할 수 있습니다:
graphqlCopy code{
notionDatabase(database_id: "a71157c311c441e5bf1950d54a5f724f") {
last_edited_time
url
content_01Token: content_01Token(properties: properties)
}
}
