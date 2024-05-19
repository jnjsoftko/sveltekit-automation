import { getSubtitles } from 'youtube-captions-scraper';
const video_id = "WIiGHobK_0E"

// getSubtitles({
//   videoID: video_id, // youtube video id
//   lang: 'ko' // default: `en`
// }).then(captions => {
//   console.log(captions);
// });

function convertToSrt(captions) {
  return captions.map((caption, index) => {
    const start = parseFloat(caption.start);
    const end = start + parseFloat(caption.dur);
    const startTime = new Date(start * 1000).toISOString().substr(11, 12);
    const endTime = new Date(end * 1000).toISOString().substr(11, 12);

    return `${index + 1}\n${startTime.replace('.', ',')} --> ${endTime.replace('.', ',')}\n${caption.text}\n`;
  }).join('\n');
}

// 예시 사용
const captions = [
    { start: '0.48', dur: '1.74', text: '안녕하세요' },
    { start: '1.079', dur: '2.281', text: '브라이입니다' },
    { start: '2.22', dur: '3.36', text: '본 영상은' },
    { start: '3.36', dur: '4.14', text: '앞으로 개인 지식 관리와 그리고' },
    { start: '5.58', dur: '2.76', text: '옵시디언을 어떻게 사용할 수 있는지에' },
    { start: '7.5', dur: '2.639', text: '대한' }
];
const srtContent = convertToSrt(captions);
console.log(srtContent);
