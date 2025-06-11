<script lang="ts">
    import { view } from "../../lib/state/view.svelte.js";
    import PokemonMeter from "./PokemonMeter.svelte";
    import PokemonImage from "./PokemonImage.svelte";
</script>

<div class="opponent">
    <PokemonMeter label="HP" val={view.encounteredPokemon!.hp} max={1} color="green" />
    <PokemonImage p={view.encounteredPokemon!} crop="small" />
</div>

<style>
    .opponent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    :global(.opponent .pokemon-meter) {
        flex-grow: 1;
    }
</style>