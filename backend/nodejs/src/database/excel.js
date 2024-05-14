// https://www.npmjs.com/package/node-xlsx

import xlsx from "node-xlsx";
import fs from "fs";
import { saveFile } from "jnj-lib-base";

const loadXslx = (filePath, sheetName) => {
  const sheets = xlsx.parse(filePath);
  const targetSheet = sheets.find((sheet) => sheet.name === sheetName);

  if (!targetSheet) {
    throw new Error(`Sheet '${sheetName}' not found in the file.`);
  }

  return targetSheet.data;
};

const saveXslx = (filePath, sheetName, data) => {
  let buffer;
  if (!fs.existsSync(filePath)) {
    buffer = xlsx.build([{ name: sheetName, data }]); // Returns a buffer
  } else {
    let sheets = xlsx.parse(filePath);
    sheets.push({ name: sheetName, data });
    buffer = xlsx.build(sheets); // Returns a buffer
  }
  saveFile(filePath, buffer);
};

export { loadXslx, saveXslx }

// // * load
// const filePath = "C:/JnJ-soft/Playground/sveltekit-database/backend/nodejs/src/database/test.xlsx";
// const data = loadXslx(filePath, "Sheet1");
// console.log(`data: ${JSON.stringify(data)}`);

// // * save
// const data = [
//   [1, 2, 3],
//   // [true, false, null, "sheetjs"],
//   // ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
//   ["baz", null, "qux"],
// ];
// const sheetName = "Sheet2";

// saveXslx(filePath, sheetName, data);
