import { resolvers as userResolvers } from "./Users/resolvers.js";
import { resolvers as acuPointsResolvers } from "./AcuPoints/resolvers.js";
import { resolvers as notionDatabaseResolvers } from "./Notion/Database/resolvers.js";
import { resolvers as youtubeResolvers } from "./Youtube/resolvers.js";

export const resolvers = [userResolvers, acuPointsResolvers, notionDatabaseResolvers, youtubeResolvers];
