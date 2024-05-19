// npm install --prefix /Users/youchan js-yaml

import fs from 'fs';
import ytdl from 'ytdl-core';
import { getSubtitles } from 'youtube-captions-scraper';
import { saveFile } from "jnj-lib-base";
// import { Youtube } from "jnj-lib-google";
import { Youtube, GoogleGemini } from "jnj-lib-google";

import { yamlFromObject, sanitizeFilename, srtFromCaptions, txtFromCaptions, stripThumbnailUrl } from '../utils/utils.js';
import { getEnv } from "../utils/env.js";

// const { GOOGLE_USER_NAME, OBSIDIAN_ROOT_PATH } = getEnv(); // APP_ROOT_DIR: 시스템 환경 설정 변수
const { GOOGLE_USER_NAME, BASE_DOWN_FOLDER, OBSIDIAN_ROOT_PATH } = { 
  GOOGLE_USER_NAME: "mooninlearn", 
  BASE_DOWN_FOLDER: "/Users/youchan/Dev/download/youtube",
  OBSIDIAN_ROOT_PATH: "/Users/youchan/Library/CloudStorage/GoogleDrive-mooninone@gmail.com/내 드라이브/Obsidian/01_Test/data"
}; // APP_ROOT_DIR: 시스템 환경 설정 변수
// const BASE_DOWN_FOLDER = "/Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-automation/download"
const MODIFY_PROMPT = "다음에 나오는 글을 맞춤법에 맞도록 수정하고, 줄바꿈이 필요없는 곳은 맞춤법에 맞게 이어주세요."

const generationConfig = {
    maxOutputTokens: 8000,
    temperature: 0.1,
    topP: 0.1,
    topK: 16,
}
// // const model = "Gemini1.5Pro"
const user = "bigwhitekmc"
const gem = new GoogleGemini({user, generationConfig});
// const gem = new GoogleGemini();

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

// prompt를 나누고, 각 부분을 처리하는 로직을 개선하여 '다 '를 기준으로 분할합니다.
const subtitleByGemini = async (content, maxPartLength = 3000) => {
  const parts = [];
  let startIndex = 0;
  let prompt = ""
  let partContent = ""
  let partAnswer = ""
  while (startIndex < content.length) {
      // console.log(`===startIndex: ${startIndex}`)
      let endIndex = startIndex + maxPartLength;
      if (endIndex < content.length) {
          // '다 '가 나오는 마지막 위치를 찾아서 분할합니다.
          const lastValidIndex = content.lastIndexOf('다 ', endIndex);
          endIndex = lastValidIndex !== -1 ? lastValidIndex + 2 : endIndex;
      }
      partContent = content.substring(startIndex, Math.min(endIndex, content.length));
      // prompt = "다음에 나오는 글에서 줄바꿈이 필요없는 경우는 맞춤법에 맞게 줄을 이어주고, 문장 단위로 줄바꿈을 해주세요.\n\n'''\n"
      prompt = MODIFY_PROMPT + "\n'''\n" + partContent + "\n'''";
      partAnswer = await gem.answer(prompt);
      // console.log(partAnswer.slice(0, 100))

      parts.push(partAnswer);
      startIndex = endIndex; // 다음 부분의 시작점을 업데이트합니다.
  }
  return parts.join('\n');
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

const saveObsidianMd = async ({txtCaption, videoInfo, defaultInfo, channelTitle, playlistTitle}) => {
  const outputPath = `${OBSIDIAN_ROOT_PATH}/${channelTitle}/${playlistTitle}/${videoInfo.title}.md`;
  videoInfo.description = videoInfo.description.split("\n")[0];
  videoInfo.thumbnail = stripThumbnailUrl(videoInfo.thumbnail);
  const info = {...defaultInfo, ...videoInfo};
  const parts = [channelTitle, playlistTitle, `${info.title}.mp4`]
  const videoPath = `${BASE_DOWN_FOLDER}/${parts.map((part) => sanitizeFilename(part)).join("/")}` 
  const videoEl = `<video src="file://${videoPath}" controls></video>`
  // console.log(txtCaption)
  const subtitle = await subtitleByGemini(txtCaption)
  // console.log(subtitle)
  let content = `---\n${yamlFromObject(info)}\n---`;
  content += `\n\n# 로컬 동영상\n${videoEl}`
  content += `\n\n# Youtube 동영상\n![](https://www.youtube.com/watch?v=${videoInfo.videoId})`
  content += `\n\n# 동영상 자막\n${subtitle}`
  saveFile(outputPath, content);
}

const saveYoutube = async ({playlistId, defaultInfo}) => {
  const { playlistTitle, channelTitle } = await playlistInfo(playlistId)
  const videoInfos = await youtube.videosByPlaylist(playlistId);
  
  // let i = 0
  for (const videoInfo of videoInfos) {
    // if (i > 0) {
    //   break
    // }
    // i += 1
    const {videoId, title} = videoInfo;
    // * download srt
    const txtCaption = await saveYoutubeSrt({videoId, title, channelTitle, playlistTitle});
    // * markdown
    await saveObsidianMd({txtCaption, videoInfo, defaultInfo, channelTitle, playlistTitle})
  }
  // // * download video
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


// [
//     'videoId',
//     'channelId',
//     'publishedAt',
//     'title',
//     'description',
//     'thumbnail'
//   ]