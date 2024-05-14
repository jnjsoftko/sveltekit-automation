import { getDatabase, getPage, getPageTitle } from "../../../database/notion.js";

const getTextContent = (text) => {
  if (!text) {
    return ""
  } else {
    return text.text.content
  }
}

const getPlainValue = async (value) => {
  let plainValue = `${value.type}`
  if (!value) {
    return ""
  }

  if (value.type === "title") {
    plainValue = getTextContent(value.title[0])
  } else if (value.type === "rich_text") {
    plainValue = getTextContent(value.rich_text[0])
  } else if  (value.type === "number") {
    plainValue = value.number ?? 0;
  } else if (value.type === "date") {
    plainValue = value.date.start ?? "";
  } else if (value.type === "select") {
    plainValue = value.select ?  value.select.name : "";
  } else if (value.type === "relation") {
    let titles = [];
    for (let page of value.relation) {
      const title = await getPageTitle({ page_id: page.id });
      titles.push(title)
    }
    plainValue = titles.join(",")
  }

  return plainValue
}

export const resolvers = {
  // * Query
  Query: {
    notionDatabase: async (_, { database_id }) => {
      const response = await getDatabase({ database_id });
      const properties = response.results.map((result) => result.properties);
      const data = properties.map(async (property) => {
        let record = {}
        for (const [key, value] of Object.entries(property)) {
          // record[key] = "test"
          record[key] = await getPlainValue(value)
        }
        return record
      });
      return data;
    },
  },
};

