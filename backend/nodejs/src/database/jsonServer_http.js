/* USAGE

https://redux-advanced.vlpt.us/3/01.html

```sh
> node backend/nodejs/src/jsonServer.js --db=users --port=3006

json-server --watch db.json --port 3001
```
*/
import * as http from "http";
import jsonServer from "json-server";
import { getEnv } from "../utils/env.js";

const { APP_ROOT_DIR, JSONSERVER_ROOT } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수
const JSON_SERVER_BASE_FOLDER = `${APP_ROOT_DIR}/${JSONSERVER_ROOT}`.replaceAll("\\", "/");

// 커맨드 라인 인자 파싱
const args = process.argv.slice(2).reduce((acc, curr) => {
  const [key, value] = curr.split("=");
  acc[key.replace("--", "")] = value;
  return acc;
}, {});

const dbName = args.db || "daily"; // 기본값 설정

const dbPath = `${JSON_SERVER_BASE_FOLDER}/${dbName}/db.json`;
const port = args.port || 3000; // 기본 포트 설정

// console.log(`JSON_SERVER_BASE_FOLDER: ${JSON_SERVER_BASE_FOLDER}`);
// console.log(`args: ${JSON.stringify(args)}`);
// console.log(`dbPath: ${dbPath}, port: ${port}`);

const server = jsonServer.create();
const router = jsonServer.router(dbPath); // 동적 경로 사용

server.use(router);

http.createServer(server).listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
