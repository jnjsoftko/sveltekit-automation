import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
// import { getEnv } from "../utils/env.js";

// const { VITE_GRAPHQLSERVER_PORT } = getEnv();

const VITE_GRAPHQLSERVER_PORT = 5005;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: VITE_GRAPHQLSERVER_PORT },
});

console.log(`🚀  Server ready at: ${url}`);
