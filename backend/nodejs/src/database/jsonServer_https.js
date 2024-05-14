/* USAGE
```sh
C:\JnJ-soft\Projects\external\bw-kmc-app> node backend/nodejs/src/jsonServer.js --db=daily --port=3001


json-server --watch db.json --port 3001
```
*/
import * as fs from "fs";
import * as https from "https";
import jsonServer from "json-server";
import path from "path";
import { loadJson, saveJson } from "jnj-lib-base";
import { getEnv } from "./utils/env.js";

const { DEV_SETTINGS, BW_KMC_ROOT, JSONSERVER_ROOT } = getEnv();
const JSON_SERVER_BASE_FOLDER = `${BW_KMC_ROOT}/${JSONSERVER_ROOT}`;

const DEFAULT_TIMER = {
  duration: "15분",
  step: "N",
  startTime: "",
  remainingTime: 900,
};

// 인증서와 키 파일의 경로 설정
const keyPath = path.resolve(`${DEV_SETTINGS}\\mkcert`, "localhost+2-key.pem");
const certPath = path.resolve(`${DEV_SETTINGS}\\mkcert`, "localhost+2.pem");

// 커맨드 라인 인자 파싱
const args = process.argv.slice(2).reduce((acc, curr) => {
  const [key, value] = curr.split("=");
  acc[key.replace("--", "")] = value;
  return acc;
}, {});

const dbPath = `${JSON_SERVER_BASE_FOLDER}/${args.db}/db.json` || `${JSON_SERVER_BASE_FOLDER}/daily/db.json`; // 기본값 설정
const port = args.port || 3000; // 기본 포트 설정

function getSeoulDate() {
  const seoulDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  const dateParts = new Date(seoulDate).toISOString().split("T")[0].split("-");
  return dateParts[0] + dateParts[1] + dateParts[2];
}

// * daily Patients 초기화(생성)
const createTodayJson = (today) => {
  // *& 오늘 daily data가 없는 경우 => 생성 (${today} => ${today})
  let dailyPatients = loadJson(dbPath) ?? [];
  const key = `${today}`;
  if (!(key in dailyPatients)) {
    // today 목록이 없는 경우
    dailyPatients[key] = [];
    saveJson(dbPath, dailyPatients);
  }
};

if (dbPath.toLocaleLowerCase().includes("daily")) {
  createTodayJson(getSeoulDate());
}

// * timer 초기화
const initTimers = () => {
  const dfault = DEFAULT_TIMER;
  let timers = loadJson(dbPath).timers ?? [];
  let _timers = [];
  for (let timer of timers) {
    _timers.push({ ...timer, ...dfault });
  }

  saveJson(dbPath, { timers: _timers });
};

if (dbPath.toLocaleLowerCase().includes("timers")) {
  initTimers();
}

const server = jsonServer.create();
const router = jsonServer.router(dbPath); // 동적 경로 사용
const middlewares = jsonServer.defaults();

const options = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

server.use(middlewares);
server.use(router);

https.createServer(options, server).listen(port, () => {
  console.log(`JSON Server is running on https://localhost:${port}`);
});
