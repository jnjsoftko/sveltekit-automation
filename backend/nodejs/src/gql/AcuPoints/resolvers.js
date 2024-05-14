import { fetchGet, fetchPost } from "../../utils/fetch.js";

const url = "http://localhost:5171/database/supabase/acuPoints"; // SUPABASE_URL

const getAllAcuPoints = async () => (await fetchGet({ url })).data.map((point) => {
  return { name_ko: point.name_ko, code: point.code };
});

const addAcuPoint = async (data) => {
  return await fetchPost({ url, data })
}

export const resolvers = {
  // * Query
  Query: {
    allAcuPoints: async (_, args) => {
      return await getAllAcuPoints();
    },
    acuPointsByName: async (_, { name }) => {
      return (await getAllAcuPoints()).find((user) => (user.name = name));
    },
  },
  // * Mutation
  Mutation: {
    addAcuPoint: async (_, { input }) => {
      await addAcuPoint(input);
      return input;
    }
  }
};

// mutation {
//   addAcuPoint(input: {name_ko: "운문", code: "LU02" }) {
//     name_ko
//     code
//   }
// }