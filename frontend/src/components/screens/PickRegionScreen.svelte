<script lang="ts">
    import PokemonButton from "../pokemon/PokemonButton.svelte";
    import PokemonTypeBadges from "../pokemon/PokemonTypeBadges.svelte";
    import { pokeAPIFetch } from "../../lib/backend.js";
    import { startGame } from "../../lib/state/player.svelte.js";
    import { setView } from "../../lib/state/view.svelte.js";

    let regions: any = $state(null);
    let regionIndex = $state(0);
    let pokemonIndex = $state(1);

    let previousPokemonIndex = $derived(pokemonIndex - 1 < 0 ? 2 : pokemonIndex - 1)
    let nextPokemonIndex = $derived(pokemonIndex + 1 > 2 ? 0 : pokemonIndex + 1)
    let currentPokemon = $derived(regions[regionIndex].starters[pokemonIndex])

    function changeRegion(by: 1 | -1) {
        let newIndex = regionIndex + by
        if (newIndex >= regions.length) newIndex = 0
        if (newIndex < 0) newIndex = regions.length-1
        regionIndex = newIndex
    }

    async function loadRegions() {
        const res = await pokeAPIFetch('/regionsAndStarters')
        regions = (await res.json()).data
        console.log("regions:", regions)
    }

    loadRegions()
</script>

{#if !regions}
    Loading regions...
{:else if regions === 'error'}
    Error
{:else}
    {@const region = regions[regionIndex]}
    <h3>Select a region and starter</h3>
    <div class="region-selector">
        <button onclick={() => changeRegion(-1)}>&larr;</button>
        <h2>{region.name}</h2>
        <button onclick={() => changeRegion(1)}>&rarr;</button>
    </div>
    <div class="pokemon-selector">
        <PokemonButton size="small" p={region.starters[previousPokemonIndex]} onclick={() => pokemonIndex = previousPokemonIndex} />
        <PokemonButton size="medium" p={region.starters[pokemonIndex]} />
        <PokemonButton size="small" p={region.starters[nextPokemonIndex]} onclick={() => pokemonIndex = nextPokemonIndex} />
    </div>
    <div class="stats">
        <h5>Stats</h5>
        <table>
            <tbody>
                <tr>
                    <td>Type(s)</td>
                    <td>
                        <PokemonTypeBadges p={currentPokemon} />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button onclick={async () => {
        await startGame(region.name, currentPokemon)
        setView({ screen: 'dashboard', controls: 'dashboard' })
    }}>
        Start game in {region.name} with {currentPokemon.name}
    </button>
{/if}

<style>
    .region-selector {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pokemon-selector {
        display: flex;
    }

    :global(.pokemon-selector > *) {
        flex-grow: 1;
    }
</style>