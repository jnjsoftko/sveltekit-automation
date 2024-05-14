export const resolvers = {
  // * Query
  Query: {
    getDatabase: async (_, { id }) => {
      return (await getAllUsers()).find((user) => (user.name = name));
    },
  },
};
