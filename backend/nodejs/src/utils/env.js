import dotenv from "dotenv";
const { APP_ROOT_DIR } = process.env;
// const APP_ROOT_DIR = "C:/JnJ-soft/Playground/sveltekit-database";
// const APP_ROOT_DIR = "/Users/youchan/Dev/Jnj-soft/Playground/nodejs/sveltekit-database"
const getEnv = () => {
  dotenv.config({ path: `${APP_ROOT_DIR}/.env` });
  return process.env;
};

export { getEnv };
