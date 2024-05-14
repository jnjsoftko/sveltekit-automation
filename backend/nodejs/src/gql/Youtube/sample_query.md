```gql
query {
  subscriptionsByUser_(name: "mooninlearn") {
    id
    snippet {
      description
    }
  }
}

query {
  playlistsByCustomUrl_(customUrl: "@darkgreenchloeJJ-pe6gq") {
    id
    snippet {
      channelId
      description
      publishedAt
      thumbnails {
        high {
          url
        }
      }
    }
    contentDetails {
      itemCount
    }
  }
}

query {
  videosByPlaylistId_(playlistId: "PLnAbm0LaZMdMhg5yCz33RiVvEM8pAMb5b") {
    id
    snippet {
      description
      thumbnails {
        high {
          url
        }
      }
    }
    contentDetails {
      videoId
      videoPublishedAt
    }
  }
}

query {
  subscriptionsByUser(name: "mooninlearn") {
    id
    description
    channelId
    publishedAt
    thumbnail
    title
  }
}

query {
  playlistsByCustomUrl(customUrl: "@darkgreenchloeJJ-pe6gq") {
    channelId
    description
    playlistId
    publishedAt
    thumbnail
    title
  }
}

query {
  videosByPlaylistId(playlistId: "PLnAbm0LaZMdMhg5yCz33RiVvEM8pAMb5b") {
    videoId
    title
    thumbnail
    publishedAt
    description
    channelId
  }
}
```