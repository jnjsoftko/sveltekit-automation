import { fetchGet } from "../utils/fetch.js";
const url = "http://localhost:3006/users";

// console.log(`users: ${JSON.stringify(await fetchGet({ url }))}`);

// const url = "http://localhost:3006/users";
const allUsers = async () => {
  const res = await fetchGet({ url });
  return res.map((user) => {
    return { name: `${user.firstName} ${user.lastName}`, email: user.email };
  });
};

console.log(`allUsers: ${JSON.stringify(await allUsers())}`);
