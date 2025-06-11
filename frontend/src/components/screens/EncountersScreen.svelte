<script lang="ts">

    import { player } from "../../lib/state/player.svelte.js";
    import { view } from "../../lib/state/view.svelte.js";
    import { playPokemonSound } from "../../lib/util.js";
    import EncounterWheel from "../misc/EncounterWheel.svelte";
    import type { Encounter, Pokemon } from "../../lib/pokemonTypes.js";
    import PokemonImage from "../pokemon/PokemonImage.svelte";
    import type { UniquePokemon } from "../../lib/poketypes.js";

    const location = $derived(player.data?.regionEncounters.locations.find(loc => loc.name === view.location))
    const area = $derived(location?.areas.find(ar => ar.name === view.area))
    const wheel = $derived(area?.encounterWheel)

    async function handleEncounter(enc: Encounter, p: UniquePokemon) {
        playPokemonSound(p)
        console.log("ENCOUNTER:", $state.snapshot(view.encounteredPokemon))
    }

</script>

<div class="encounter-screen">
    {#if !player.data}
        No player data loaded.
    {:else if !location}
        No location selected.
    {:else if !area}
        No area selected.
    {:else if !wheel}
        This area does not have encounters.
    {:else}
        <h5>{area.name}</h5>
        <div class="container">
            <EncounterWheel {wheel} onEncounter={handleEncounter}/>
            {#if view.encounteredPokemon}
                <div>
                    <div class="pokemon-img">
                        <PokemonImage p={view.encounteredPokemon} />
                    </div>
                    <p>A wild <strong>{view.encounteredPokemon.name}</strong> appeared!</p>
                </div>
            {:else}
                <div>
                    <p>Searching for pokémon...</p>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    h5 {
        white-space: nowrap;
    }

    .encounter-screen {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;

        & > .container {
            flex-grow: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }

</style>