import {Youtube} from "jnj-lib-google";

const youtube = new Youtube("mooninlearn");
// const youtube = new Youtube("bigwhitekmc");
await youtube.init();

// // * subscriptions
// const subscriptions = await youtube.subscriptions();
// // const subscriptions = await youtube.subscriptions_();
// console.log(JSON.stringify(subscriptions[0]));
// // // console.log(subscriptions.length);

// * search
let videos = await youtube.search();
const channelId = await youtube.channelIdByCustomUrl("@darkgreenchloeJJ-pe6gq");
console.log(channelId);

// // * channelPlaylists
// // const list = await youtube.channelPlaylists_(channelId);
// const list = await youtube.channelPlaylists(channelId);
// console.log(JSON.stringify(list[0]));
// // console.log(list.length);

// * videosByPlaylist
const playlistId = "PLnAbm0LaZMdMhg5yCz33RiVvEM8pAMb5b";
// videos = await youtube.videosByPlaylist_(playlistId);
videos = await youtube.videosByPlaylist(playlistId);
console.log(JSON.stringify(videos[0]));
// console.log(videos.length);
