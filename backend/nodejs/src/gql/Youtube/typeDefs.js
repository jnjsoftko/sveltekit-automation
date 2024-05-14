export const typeDefs = `#graphql
  # * Subscription
  type Subscription_ {
    id: String!
    snippet: Snippet!
  }

  type Snippet {
    publishedAt: String!
    title: String!
    description: String!
    resourceId: ResourceId!
    channelId: String!
    thumbnails: Thumbnails!
  }

  type ResourceId {
    kind: String!
    channelId: String!
  }

  type Thumbnails {
    default: Thumbnail!
    medium: Thumbnail!
    high: Thumbnail!
    standard: Thumbnail
    maxres: Thumbnail
  }

  type Thumbnail {
    url: String!
    width: Int,
    height: Int
  }

  # * Playlist
  type Playlist_ {
    kind: String!
    etag: String!
    id: String!
    snippet: PlaylistSnippet!
    contentDetails: ContentDetails!
  }

  type PlaylistSnippet {
    publishedAt: String!
    channelId: String!
    title: String!
    description: String!
    thumbnails: Thumbnails!
    channelTitle: String!
    localized: Localized!
  }

  type Localized {
    title: String!
    description: String!
  }

  type ContentDetails {
    itemCount: Int
    videoId: String
    videoPublishedAt: String
  }

  # * Video
  type Video_ {
    kind: String!
    etag: String!
    id: String!
    snippet: VideoSnippet!
    contentDetails: ContentDetails!
  }

  type VideoSnippet {
    publishedAt: String!
    channelId: String!
    title: String!
    description: String!
    thumbnails: Thumbnails!
    channelTitle: String!
    playlistId: String!
    position: Int!
    resourceId: ResourceId!
    videoOwnerChannelTitle: String!
    videoOwnerChannelId: String!
  }

  # * Subscription
  type Subscription {
    id: String!
    channelId: String!
    publishedAt: String!
    title: String!
    description: String!
    thumbnail: String!
  }

  # * Playlist
  type Playlist {
    playlistId: String!
    itemCount: Int!
    channelId: String!
    publishedAt: String!
    title: String!
    description: String!
    thumbnail: String!
    title_: String!
    description_: String!
  }

  # * Video
  type Video {
    videoId: String!
    channelId: String!
    publishedAt: String!
    title: String!
    description: String!
    thumbnail: String!
  }

  # * Query
  type Query {
    subscriptionsByUser_(name: String!): [Subscription_]
    playlistsByChannelId_(channelId: String!): [Playlist_]
    playlistsByCustomUrl_(customUrl: String!): [Playlist_]
    videosByPlaylistId_(playlistId: String!): [Video_]
    # flatten object
    subscriptionsByUser(name: String!): [Subscription]
    playlistsByChannelId(channelId: String!): [Playlist]
    playlistsByCustomUrl(customUrl: String!): [Playlist]
    videosByPlaylistId(playlistId: String!): [Video]
  }
`;
