import { GoogleSheets } from "jnj-lib-google";
import { dictsFromRows, loadFile, loadJson, saveJson, findFiles, findFolders, findFilesRecusive, slashedFolder } from "jnj-lib-base";
import { getEnv } from "../../utils/env.js";
import { fetchGet } from "../../utils/fetch.js";

// & Variable AREA
// &---------------------------------------------------------------------------
const { APP_ROOT_DIR } = getEnv();
// const url = "http://localhost:3006/users"; // JSON_URL
// const url = "http://localhost:5171/database/pocketbase/users"; // POCKETBASE_URL
const url = "http://localhost:5171/database/supabase/users"; // SUPABASE_URL

// * Jsonserver
// const getAllUsers = async () => {
//   const res = await fetchGet({ url });
//   return res.map((user) => {
//     return { name: `${user.firstName} ${user.lastName}`, email: user.email };
//   });
// };

// * Pocketbase
// const getAllUsers = async () => {
//   const res = await fetchGet({ url });
//   return res.map((user) => {
//     return { name: user.name, email: "" };
//   });
// };

// * Supabase
const getAllUsers = async () => {
  const res = await fetchGet({ url });
  return res.data.map((user) => {
    return { name: user.username, email: user.email };
  });
};

// * Googlesheet
// const getAllUsers = async () => {
//   const [user, spreadsheetId, sheetName, range] = ["bigwhitekmc", "1abKYQScJlfwLda1u1icdXsN_Tk9Eq-W9g_O2jHEsKqo", "users", ""];
//   const googleSheets = new GoogleSheets({ spreadsheetId, user });
//   await googleSheets.init();

//   // * Get Values
//   const values = await googleSheets.getValues({ range, sheetName });
//   return dictsFromRows(values);
// };

export const resolvers = {
  // * Query
  Query: {
    allUsers: async (_, args) => {
      return await getAllUsers();
    },
    userByName: async (_, { name }) => {
      return (await getAllUsers()).find((user) => (user.name = name));
    },
  },
};

// export const POST: RequestHandler = async ({ request, params }: { request: any; params: any }) => {
// 	try {
// 		const { values, start } = await request.json(); // 파일 이름을 받음
// 		const valueInputOption = 'USER_ENTERED';
// 		const { user, spreadsheetId, sheetName } = params;
// 		const googleSheets = new GoogleSheets({ spreadsheetId, user });
// 		await googleSheets.init();
// 		await googleSheets.setValues({ values, start, sheetName, valueInputOption });

// 		return json({ message: '데이터가 성공적으로 업로드되었습니다.' });
// 	} catch (err) {
// 		return error(500, `데이터 업로드 중 오류가 발생했습니다: ${err.message}`);
// 	}
// };

// https://192.168.0.42:5172/API/sheet/bigwhitekmc/1abKYQScJlfwLda1u1icdXsN_Tk9Eq-W9g_O2jHEsKqo/경혈학각론?range=A2:J
