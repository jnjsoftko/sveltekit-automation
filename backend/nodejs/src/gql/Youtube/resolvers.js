import {Youtube} from "jnj-lib-google";

let youtube = new Youtube("mooninlearn");
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
    return item
  })
}

export const resolvers = {
  // * Query
  Query: {
    subscriptionsByUser_: async (_, {name="mooninlearn"}) => {
      // youtube = new Youtube(name);
      // await youtube.init();
      return await youtube.subscriptions_();
    },
    playlistsByChannelId_: async (_, { channelId }) => {
      return await youtube.channelPlaylists_(channelId);
    },
    playlistsByCustomUrl_: async (_, { customUrl }) => {
      const channelId = await youtube.channelIdByCustomUrl(customUrl);
      return await youtube.channelPlaylists_(channelId);
    },
    videosByPlaylistId_: async (_, { playlistId }) => {
      return await youtube.videosByPlaylist_(playlistId);
    },

    // * flatten object
    subscriptionsByUser: async (_, {name="mooninlearn"}) => {
      // youtube = new Youtube(name);
      // await youtube.init();
      return await youtube.subscriptions();
    },
    playlistsByChannelId: async (_, { channelId }) => {
      return stripThumnailUrl(await youtube.channelPlaylists(channelId));
    },
    playlistsByCustomUrl: async (_, { customUrl }) => {
      const channelId = await youtube.channelIdByCustomUrl(customUrl);
      return stripThumnailUrl(await youtube.channelPlaylists(channelId));
    },
    videosByPlaylistId: async (_, { playlistId }) => {
      // let response = stripThumnailUrl(await youtube.videosByPlaylist(playlistId))
      // console.log(response);
      return stripThumnailUrl(await youtube.videosByPlaylist(playlistId));
    },
  },
};
