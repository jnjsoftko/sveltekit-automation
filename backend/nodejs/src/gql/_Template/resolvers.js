export const resolvers = {
  // * Query
  Query: {
    allUsers: async (_, args) => {
      return await getAllUsers();
    },
    userByName: async (_, { name }) => {
      return (await getAllUsers()).find((user) => (user.name = name));
    },
  },
};