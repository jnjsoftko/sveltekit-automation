import fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

// ffmpeg 경로 설정 (필요한 경우)
ffmpeg.setFfmpegPath('/opt/homebrew/bin/ffmpeg');

const videoId = 'WIiGHobK_0E';
const url = `https://www.youtube.com/watch?v=${videoId}`;
const outputDirectory = path.resolve('./');  // 현재 디렉토리의 절대 경로
const videoPath = path.join(outputDirectory, 'video.mp4');
const audioPath = path.join(outputDirectory, 'audio.mp4');
const output = path.join(outputDirectory, 'output.mp4');

// Function to merge audio and video
function mergeAudioVideo(videoPath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
    //   .outputOptions('-c:v copy', '-c:a aac', '-strict', 'experimental')
      .outputOptions(['-c:v libx264', '-c:a aac'])
      .output(outputPath)
      .on('end', resolve)
      .on('error', (err, stdout, stderr) => {
        console.error('ffmpeg stderr:', stderr);
        reject(err);
      })
      .run();
  });
}

// Download video and audio separately
Promise.all([
  new Promise((resolve, reject) => {
    ytdl(url, { quality: '137' })  // 137 is the format code for 1080p video
      .pipe(fs.createWriteStream(videoPath))
      .on('finish', resolve)
      .on('error', reject);
  }),
  new Promise((resolve, reject) => {
    ytdl(url, { quality: '140' })  // 140 is the format code for audio
      .pipe(fs.createWriteStream(audioPath))
      .on('finish', resolve)
      .on('error', reject);
  })
])
.then(() => mergeAudioVideo(videoPath, audioPath, output))
.then(() => {
  console.log('Download and merge completed!');
  // Clean up temporary files
  fs.unlinkSync(videoPath);
  fs.unlinkSync(audioPath);
})
.catch(err => {
  console.error('Error during download or merge:', err);
});
