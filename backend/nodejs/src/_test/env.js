import dotenv from "dotenv";
const { APP_ROOT_DIR } = process.env;
// const APP_ROOT_DIR = "C:/JnJ-soft/Playground/sveltekit-database"
// const APP_ROOT_DIR = "/Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-database"

const getEnv = () => {
  dotenv.config({ path: `${APP_ROOT_DIR}/.env` });
  return process.env;
};

// const { GOOGLE_API_KEY } = process.env;
const { GOOGLE_API_KEY } = getEnv();
// const { GOOGLE_API_KEY } = process.env;
console.log(`GOOGLE_API_KEY: ${GOOGLE_API_KEY}`);
console.log(`APP_ROOT_DIR: ${APP_ROOT_DIR}`);
// console.log(`process.env: ${JSON.stringify(process.env)}`);

export { getEnv };
