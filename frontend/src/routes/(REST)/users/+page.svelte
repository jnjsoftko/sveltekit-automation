<script lang="ts">
  import { onMount } from "svelte";

  const { VITE_POCKETBASE_PROTOCOL, VITE_POCKETBASE_IP, VITE_POCKETBASE_PORT } = import.meta.env;
  const baseUrl = `${VITE_POCKETBASE_PROTOCOL}://${VITE_POCKETBASE_IP}:${VITE_POCKETBASE_PORT}`;
  // const url = `https://127.0.0.1:8091/api/collections/users/records`;
  const url = `${baseUrl}/api/collections/users/records`;
  let users: any;

  const getUsers = async () => {
    return await (await fetch(url)).json();
  };

  onMount(async () => {
    users = await getUsers();
  });
</script>

<p>{JSON.stringify(users)}</p>
