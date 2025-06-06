<script lang="ts">
  import Header from "./components/layout/Header.svelte";
  import Game from "./components/layout/Game.svelte";
  import Footer from "./components/layout/Footer.svelte";

  import { onMount } from "svelte";
  import { loadPlayerData } from "./lib/state/player.svelte.js";

  onMount(async () => {
    await loadPlayerData()
  })
  
</script>

<!-- <Header /> -->
<Game />
<!-- <Footer /> -->