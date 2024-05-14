import { arrsFromDicts, rowsFromDicts, updateKeys, loadFile, saveFile, findFiles, tsvFromSrt } from "jnj-lib-base";
import { Youtube } from "jnj-lib-google";
import { getEnv } from "../utils/env.js";

const { GOOGLE_USER_NAME, OBSIDIAN_ROOT_PATH } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수

const propertyKeys = [
  "video_title",
  "video_url",
  "thumbnail",
  "description",
  "playlist_url",
  "channel_name",
  "channel_url",
  "categories",
  "tags",
  "related_notes",
  "publishedAt",
  "view_dates",
  "likeability",
  "difficulty",
];

const youtube = new Youtube(GOOGLE_USER_NAME);
await youtube.init();

const stripThumnailUrl = (objs) => {
  /*
    "thumbnail": "=image(\"https://i.ytimg.com/vi/k_p5h4Tf0ZM/hqdefault.jpg\")",
    =>
    "thumbnail": "https://i.ytimg.com/vi/k_p5h4Tf0ZM/hqdefault.jpg",
    */
  return objs.map((item) => {
    const regex = /=image\("(.+?)"\)/;
    const found = item["thumbnail"].match(regex);
    item["thumbnail"] = found ? found[1] : item["thumbnail"];
    return item;
  });
};

function sanitizeFilename(filename, to = "_") {
  return filename.replace(/[\<\>:"/|?*]/g, to);
}

const getProperties = async ({ playlistId, defaults }) => {
  let videos = await youtube.videosByPlaylist(playlistId);
  let maps = {};
  for (const [key, value] of Object.entries(videos[0])) {
    maps[key] = key;
  }
  maps.videoId = "video_url";
  maps.title = "video_title";
  for (const [key, value] of Object.entries(defaults)) {
    maps[key] = key;
  }

  let properties = stripThumnailUrl(videos).map((video) => {
    return updateKeys(video, maps, defaults);
  });

  return properties.map((property) => {
    property.video_url = `https://www.youtube.com/watch?v=${property.video_url}`;
    return property;
  });
};

const frontMatter = (property) => {
  const entries = Object.entries(property).map(([key, value]) => {
    value = key === "description" ? value.split("\n")[0] : value;
    return !value.includes("\n") && /[^0-9,]/.test(value) ? `${key}: "${value}"` : `${key}: ${value}`;
    // return (!value.includes("\n") && !/[^0-9,]/.test(value))? `${key}: "${value}"` : `${key}: ${value}`
  });
  return `---\n${entries.join("\n")}\n---\n`;
};

const frontMatterFromRow = (row, header) => {
  // console.log(`row: ${row}`);
  const indexD = header.indexOf("description");
  let [value, key, entries] = ["", "", []];
  // let value = "";
  // let key = "";
  // let entries = [];
  row[indexD] = row[indexD].split("\n")[0];

  for (let i = 0; i < row.length; i++) {
    value = row[i];
    key = header[i];
    entries.push(!value.includes("\n") && /[^0-9,]/.test(value) ? `${key}: "${value}"` : `${key}: ${value}`);
  }
  return `---\n${entries.join("\n")}\n---\n`;
};

const getFrontMatters = (properties, propertyKeys, titleKey = "video_title") => {
  const indexT = propertyKeys.indexOf(titleKey);
  let frontMatters = rowsFromDicts(properties, [propertyKeys, propertyKeys]);
  // ? [prefix, title, frontMatter]
  return frontMatters
    .slice(1)
    .map((property, index) => [`${(index + 1).toString().padStart(2, "0")}`, property[indexT], frontMatterFromRow(property, propertyKeys)]);
};

const saveHomeFile = (frontMatters, subFolder, localPlaylistFolder) => {
  let strHomeFile = "";
  for (let frontMatter of frontMatters) {
    const [prefix, title, _frontMatter] = frontMatter;
    const name = `${prefix}_${sanitizeFilename(title)}`;
    strHomeFile += `[[${name}]]\n\n`;
  }
  let fileName = `00_${subFolder.split("/").slice(-1)[0]}`;
  saveFile(`${OBSIDIAN_ROOT_PATH}/${subFolder}/${fileName}.md`, strHomeFile);
};

const saveVideoInfos = (frontMatter, subFolder, localPlaylistFolder) => {
  const [prefix, title, _frontMatter] = frontMatter;
  const name = sanitizeFilename(title).split("_")[0];
  const file = findFiles(localPlaylistFolder).find((file) => file.includes(name) && file.endsWith(".srt"));
  const path = `${localPlaylistFolder}/${file}`;
  const txtFromSrt = (str) => {
    return `${str}`.replace(/\d+\n\d\d:[^\n]+\n/g, "").replaceAll("\n\n", "\n");
  };

  // OBSIDIAN_ROOT_PATH
  const folder = `${OBSIDIAN_ROOT_PATH}/${subFolder}`;
  saveFile(`${folder}/${prefix}_${sanitizeFilename(title)}.md`, `${_frontMatter}\n${txtFromSrt(loadFile(path))}`, "utf-8");
};

const saveVideoInfosInPlaylist = async ({ playlistId, defaults, subFolder, localPlaylistFolder }) => {
  const properties = await getProperties({ playlistId, defaults });
  const frontMatters = getFrontMatters(properties, propertyKeys);
  saveHomeFile(frontMatters, subFolder, localPlaylistFolder);

  for (let frontMatter of frontMatters) {
    saveVideoInfos(frontMatter, subFolder, localPlaylistFolder);
  }
};

// * 실행
// const subFolder = "jnj-soft/TOOLS/obsidian/옵시디언 사용법 A to Z";
// const localPlaylistFolder = "C:/Users/Jungsam/Videos/youtube/IT/북트레싱/옵시디언 사용법 A to Z";
// const playlistId = "PL-KPFbwFiAWA3bR3QSK3w6r_XM0KRzEFl";
// const defaults = {
//   playlist_url: `https://www.youtube.com/playlist?list=${playlistId}`,
//   channel_name: "북트레이싱", // 변수
//   channel_url: "https://www.youtube.com/@booktracing", // 변수
//   categories: "\n   - 생산성 도구\n   - 메모",
//   tags: "\n   - 옵시디언\n   - 지식관리\n   - 세컨드_브레인",
//   related_notes: "[[00_옵시디언 사용법 A to Z]]",
//   view_dates: "\n   - 2024-05-12",
//   likeability: "3",
//   difficulty: "1",
// };

// const playlistName = "LangChain 튜토리얼";
// const subFolder = `jnj-soft/PLAYGROUND/ai/langchain/${playlistName}`;
// const localPlaylistFolder = `C:/Users/Jungsam/Videos/youtube/IT/테디노트/${playlistName}`;
// const playlistId = "PLIMb_GuNnFweShkx8-yorSjhwGKv9raR_";
// const defaults = {
//   playlist_url: `https://www.youtube.com/playlist?list=${playlistId}`,
//   channel_name: "테디노트", // 변수
//   channel_url: "https://www.youtube.com/@teddynote", // 변수
//   categories: "\n   - AI\n   - python",
//   tags: "\n   - AI\n   - python\n   - LangChain",
//   related_notes: "[[00_LangChain 튜토리얼]]",
//   view_dates: "\n   - 2024-05-13",
//   likeability: "4",
//   difficulty: "2",
// };

// const playlistName = "판다스 스튜디오_LangChain 랭체인 기초";
// const subFolder = `jnj-soft/PLAYGROUND/ai/langchain/${playlistName}`;
// const localPlaylistFolder = "C:/Users/Jungsam/Videos/youtube/IT/판다스 스튜디오/LangChain   랭체인 기초";
// const playlistId = "PL5bzmUGXvZNQdYaTGYQiGxSllaQ0d1rjW";
// const defaults = {
//   playlist_url: `https://www.youtube.com/playlist?list=${playlistId}`,
//   channel_name: "판다스 스튜디오", // 변수
//   channel_url: "@pandas-data-studio", // 변수
//   categories: "\n   - AI\n   - python",
//   tags: "\n   - AI\n   - python\n   - LangChain",
//   related_notes: "[[00_LangChain 튜토리얼]]",
//   view_dates: "\n   - 2024-05-13",
//   likeability: "3",
//   difficulty: "2",
// };

const playlistName = "판다스 스튜디오_LangChain 랭체인 응용하기";
const subFolder = `jnj-soft/PLAYGROUND/ai/langchain/${playlistName}`;
const localPlaylistFolder = "C:/Users/Jungsam/Videos/youtube/IT/판다스 스튜디오/LangChain   랭체인 응용하기";
const playlistId = "PL5bzmUGXvZNRPQi4PAGFkA2inN-tRF4Mi";
const defaults = {
  playlist_url: `https://www.youtube.com/playlist?list=${playlistId}`,
  channel_name: "판다스 스튜디오", // 변수
  channel_url: "@pandas-data-studio", // 변수
  categories: "\n   - AI\n   - python",
  tags: "\n   - AI\n   - python\n   - LangChain",
  related_notes: "[[00_LangChain 튜토리얼]]",
  view_dates: "\n   - 2024-05-13",
  likeability: "3",
  difficulty: "2",
};

await saveVideoInfosInPlaylist({ playlistId, defaults, subFolder, localPlaylistFolder });
