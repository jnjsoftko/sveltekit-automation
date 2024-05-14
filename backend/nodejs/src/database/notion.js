// https://github.com/makenotion/notion-sdk-js

import { Client } from "@notionhq/client";
import { getEnv } from "../utils/env.js";

const { NOTION_TOKEN } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수

// Initializing a client
const notion = new Client({ auth: NOTION_TOKEN });

// browser: http://localhost:4565/databases/ad02bf1db09140cda3a502b81bac91ee
const getDatabase = async ({ database_id }) => {
  const database = await notion.databases.query({
    database_id,
    // filter: {
    //   property: "01Name",
    //   rich_text: {
    //     contains: "disqus",
    //   },
    // },
  });
  return database;
};

/**
 * Retrieves a page from Notion API based on the provided page ID.
 *
 * @param {Object} options - The options object.
 * @param {string} options.page_id - The ID of the page to retrieve.
 * @return {Promise<Object>} A promise that resolves to the retrieved page object.
 */
const getPage = async ({ page_id }) => {
  return await notion.pages.retrieve({
    page_id
  });
};

const getPageTitle = async ( { page_id } ) => {
  const page = await notion.pages.retrieve({ page_id })
  return await Object.values(page.properties).find(obj => obj.type === 'title').title[0].plain_text;
};

export { getDatabase, getPage, getPageTitle };

// const database_id = "ad02bf1db09140cda3a502b81bac91ee";
// const database_id = "a71157c311c441e5bf1950d54a5f724f";
// console.log(`database: ${JSON.stringify(database.results)}`);

// const database_id = "d9cf3688-5080-4fd4-86a3-5a515000525b"
// const database = await getDatabase({ database_id });
// const page_id = "d9cf3688-5080-4fd4-86a3-5a515000525b"
// const page_id = "d9cf3688-5080-4fd4-86a3-5a515000525b"
// const title = await getPageTitle( { page_id } )
// console.log(`title: ${title}`);
// console.log(`page: ${JSON.stringify(page)}`);

