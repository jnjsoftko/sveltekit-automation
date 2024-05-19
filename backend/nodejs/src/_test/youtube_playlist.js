// npm install --prefix /Users/youchan js-yaml

import fs from 'fs';
import ytdl from 'ytdl-core';
import { getSubtitles } from 'youtube-captions-scraper';
import { saveFile } from "jnj-lib-base";
import { Youtube } from "jnj-lib-google";

import { yamlFromObject, sanitizeFilename, srtFromCaptions, txtFromCaptions, stripThumbnailUrl } from '../utils/utils.js';
import { getEnv } from "../utils/env.js";

// const { GOOGLE_USER_NAME, OBSIDIAN_ROOT_PATH } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수
const { GOOGLE_USER_NAME, BASE_DOWN_FOLDER, OBSIDIAN_ROOT_PATH } = { 
  GOOGLE_USER_NAME: "mooninlearn", 
  BASE_DOWN_FOLDER: "/Users/youchan/Dev/download/youtube",
  OBSIDIAN_ROOT_PATH: "/Users/youchan/Library/CloudStorage/GoogleDrive-mooninone@gmail.com/내 드라이브/Obsidian/01_Test/data"
}; // APP_ROOT_DIR: 시스템 환경 설정 변수
// const BASE_DOWN_FOLDER = "/Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-automation/download"

// * youtube
const youtube = new Youtube(GOOGLE_USER_NAME);
await youtube.init();

// * save srt, return txt
const saveYoutubeSrt = async ({videoId, title, channelTitle, playlistTitle, lang='ko'}) => {
  const parts = [channelTitle, playlistTitle, `${title}.srt`]
  const outputPath = `${BASE_DOWN_FOLDER}/${parts.map((part) => sanitizeFilename(part)).join("/")}` 
  const captions = await getSubtitles({videoID: videoId, lang: lang}) // default: `ko`
  saveFile(outputPath, srtFromCaptions(captions));
  return txtFromCaptions(captions);
}

// * save video
const saveYoutubeVideo = ({videoId, title, channelTitle, playlistTitle, options={ quality: 'highestvideo', filter: 'audioandvideo' }}) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const parts = [channelTitle, playlistTitle, `${title}.mp4`]
  const outputPath = `${BASE_DOWN_FOLDER}/${parts.map((part) => sanitizeFilename(part)).join("/")}` 

  ytdl(url, options)
    .pipe(fs.createWriteStream(outputPath))
    .on('finish', () => {
      console.log('Download completed!');
    })
    .on('error', (err) => {
      console.error('Error during download:', err);
    });
}


// * playlistInfo
const playlistInfo = async (playlistId) => {
  const id = "PLAjy5691VPZgneOq41bVw-2Qa1nZGQ-zK";

  const response = await youtube.service.playlists.list({
    part: "snippet,contentDetails".split(","),
    id,
    maxResults:1,
  });
  const {title, channelTitle} = response.data.items[0].snippet;
  return {playlistTitle: title.trim(), channelTitle: channelTitle.trim()};
}

const saveObsidianMd = ({txtCaption, videoInfo, defaultInfo, channelTitle, playlistTitle}) => {
  const outputPath = `${OBSIDIAN_ROOT_PATH}/${channelTitle}/${playlistTitle}/${videoInfo.title}.md`;
  videoInfo.description = videoInfo.description.split("\n")[0];
  videoInfo.thumbnail = stripThumbnailUrl(videoInfo.thumbnail);
  const info = {...defaultInfo, ...videoInfo};
  const parts = [channelTitle, playlistTitle, `${info.title}.mp4`]
  const videoPath = `${BASE_DOWN_FOLDER}/${parts.map((part) => sanitizeFilename(part)).join("/")}` 
  const videoEl = `<video src="file://${videoPath}" controls></video>`
  const content = `---\n${yamlFromObject(info)}\n---\n\n${videoEl}\n\n${txtCaption}\n`;
  saveFile(outputPath, content);
  // * frontmatter
  // const {title, channelTitle, playlistTitle} = videoInfo;
  // const frontmatter = 
}

const saveYoutube = async ({playlistId, defaultInfo}) => {
  const { playlistTitle, channelTitle } = await playlistInfo(playlistId)
  const videoInfos = await youtube.videosByPlaylist(playlistId);
  
  for (const videoInfo of videoInfos) {
      const {videoId, title} = videoInfo;
      const txtCaption = await saveYoutubeSrt({videoId, title, channelTitle, playlistTitle});
      // * markdown
      saveObsidianMd({txtCaption, videoInfo, defaultInfo, channelTitle, playlistTitle})
  }

  // for (const videoInfo of videoInfos) {
  //   const {videoId, title} = videoInfo;
  //   await saveYoutubeVideo({videoId, title, channelTitle, playlistTitle});
  // }
}

const playlistId = "PLAjy5691VPZgneOq41bVw-2Qa1nZGQ-zK";
const defaultInfo = {
  author: "youchan",
  categories: ["AI", "python"],
  tags: ["youtube", "obsidian", "md"],
  likeability: 3,
  difficulty: 2,
}
await saveYoutube({playlistId, defaultInfo});


// * npm install js-yaml

// import yaml from 'js-yaml';

// function yamlFromObject(obj) {
//   try {
//     const yamlStr = yaml.dump(obj);
//     console.log(yamlStr);
//     return yamlStr;
//   } catch (e) {
//     console.error('YAML 변환 중 오류 발생:', e);
//   }
// }

// // 사용 예
// const myObject = {
//   name: "홍길동",
//   age: 25,
//   skills: ["JavaScript", "Node.js", "React"]
// };

// const yamlStr = yamlFromObject(myObject);
// console.log(yamlStr);

// [
//     'videoId',
//     'channelId',
//     'publishedAt',
//     'title',
//     'description',
//     'thumbnail'
//   ]