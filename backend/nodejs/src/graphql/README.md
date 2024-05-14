```sh
# macos
cd /Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-database/backend/nodejs/src/graphql
node --watch index.js
```

http://localhost:5001/

```gql
{
  allUsers {
    name
    email
  }
}

{
  userByName(name: "태백한의원") {
    email
  }
}
```

## type / schema

https://transform.tools/json-to-graphql

https://github.com/hasura/json2graphql

https://app.quicktype.io/

JSON to GraphQL

https://j2g.now.sh/
JSON 데이터를 입력하고 필요한 옵션을 설정하면 GraphQL 스키마를 생성합니다.

GraphQL Schema Generator

https://lucasconstantino.github.io/graphql-schemas/
JSON, YAML 또는 JavaScript 객체를 입력하면 GraphQL 스키마를 생성합니다.

GraphQL Voyager

https://voyager.prefbins.studio/
GraphQL 스키마를 시각화하고 쿼리를 테스트할 수 있습니다. JSON 데이터를 입력하면 해당하는 GraphQL 스키마로 변환됩니다.
