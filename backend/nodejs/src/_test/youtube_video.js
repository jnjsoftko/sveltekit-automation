import fs from 'fs';
import ytdl from 'ytdl-core';


const downloadYutube = ({videoId, outputPath, options={ quality: 'highestvideo', filter: 'audioandvideo' }}) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  ytdl(url, options)
    .pipe(fs.createWriteStream(outputPath))
    .on('finish', () => {
      console.log('Download completed!');
    })
    .on('error', (err) => {
      console.error('Error during download:', err);
    });
}

const videoId = 'WIiGHobK_0E';
const outputPath = "/Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-automation/backend/nodejs/src/_test/output.mp4"

downloadYutube({videoId, outputPath})