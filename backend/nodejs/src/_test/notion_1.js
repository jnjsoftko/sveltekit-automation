import { Client } from "@notionhq/client";
import { getEnv } from "../utils/env.js";

const { NOTION_TOKEN } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수

// Initializing a client
const notion = new Client({ auth: NOTION_TOKEN });

// GraphQL 쿼리 정의
// const query = `
//   {
//     database(id: "a71157c311c441e5bf1950d54a5f724f") {
//       title
//       properties {
//         Name: {
//           type
//           title
//         }
//         Description: {
//           type
//           rich_text
//         }
//       }
//       pages {
//         object
//         id
//         properties {
//           Name
//           Description
//         }
//       }
//     }
//   }
// `;

const query = `
  {
    database(id: "a71157c311c441e5bf1950d54a5f724f") {
      title
    }
  }
`;

// GraphQL 쿼리 실행
notion.databases.query({ database_id: "a71157c311c441e5bf1950d54a5f724f" }).then((res) => {
  // notion.databases.query({ database_id: "a71157c311c441e5bf1950d54a5f724f", filter: {}, query }).then((res) => {
  console.log(res.results);
});
