import PocketBase from "pocketbase";
import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_POCKETBASE_SERVE_HTTP, VITE_POCKETBASE_PROTOCOL, VITE_POCKETBASE_IP, VITE_POCKETBASE_PORT } =
  import.meta.env;

// * supabase
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

// * pocketBase
// const pocketbase = new PocketBase(`${VITE_POCKETBASE_PROTOCOL}://${VITE_POCKETBASE_IP}:${VITE_POCKETBASE_PORT}`);
const pocketbase = new PocketBase(`http://127.0.0.1:8090`);
// const pocketbase = new PocketBase(`http://${VITE_POCKETBASE_SERVE_HTTP}`);
// const pocketbase = new PocketBase("https://127.0.0.1:8091/");  #
export { pocketbase, supabase };
