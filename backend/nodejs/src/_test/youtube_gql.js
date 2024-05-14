import { fetchGql } from "../utils/fetch.js";
const url = "http://localhost:5005/";

const playlistId = "PLnAbm0LaZMdMhg5yCz33RiVvEM8pAMb5b";

const videosByPlaylistId = async (playlistId) => {
    let query = '{ videosByPlaylistId(playlistId: "${playlistId}") { videoId title thumbnail publishedAt description channelId } }'
    const values = { playlistId }
    return await fetchGql({ url, query, values}) 
}

const videos = await videosByPlaylistId(playlistId)
console.log(`videos: ${JSON.stringify(videos)}`)