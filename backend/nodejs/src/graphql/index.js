import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";

// import { getEnv } from "../utils/env.js";

// const { VITE_GRAPHQLSERVER_PORT } = getEnv();

const VITE_GRAPHQLSERVER_PORT = 5006;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: VITE_GRAPHQLSERVER_PORT },
});

console.log(`🚀  Server ready at: ${url}`);
