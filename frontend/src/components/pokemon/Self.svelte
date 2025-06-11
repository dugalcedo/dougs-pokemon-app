<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
    import PokemonMeter from "./PokemonMeter.svelte";
    import PokemonImage from "./PokemonImage.svelte";

    const p = $derived(player.data!.pokemon[0])
</script>

<div class="self">
    <PokemonImage p={p!} crop="small" back={true} />
    <PokemonMeter label="HP" val={p!.hp} max={1} color="green" />
</div>

<style>
    .self {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    :global(.self .pokemon-meter) {
        flex-grow: 1;
    }
</style>