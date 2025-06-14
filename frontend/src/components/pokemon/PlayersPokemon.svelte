<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
    import PokemonImage from "./PokemonImage.svelte";
    import PokemonMeter from "./PokemonMeter.svelte";
    import { setView } from "../../lib/state/view.svelte.js";

    if (!player.data || !player.data.pokemon.length) {
        setView({
            screen: 'pickRegion',
            controls: 'none'
        })
    }
</script>

{#if !player.data}
    ... no data
{:else if player.data.pokemon.length === 0}
    ... no pokemon
{:else}
    <div class="players-pokemon">
        {#each player.data.pokemon as p}
            <div class="pokemon">
                <PokemonImage {p} crop="small" />
                <div class="info1">
                    <h4 class="name">{p.name}</h4>
                    <div class="stat">
                        <strong>LVL:</strong>
                        {p.level}
                    </div>
                </div>
                <div class="info2">
                    <PokemonMeter label="HP" val={p.hp} max={1} color="red" />
                    <PokemonMeter label="EXP" val={p.exp} max={1} color="red" />
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .pokemon {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .info1 {
        background-color: lightgray;
        padding: 0 .5rem;
        border-radius: 4px;
    }

    .info2 {
        flex-grow: 1;
    }
</style>