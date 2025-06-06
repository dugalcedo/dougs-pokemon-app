<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
</script>

{#if !player.data}
    ...
{:else}
    <h3>Welcome to the world of pokemon, {player.data.name}.</h3>
{/if}