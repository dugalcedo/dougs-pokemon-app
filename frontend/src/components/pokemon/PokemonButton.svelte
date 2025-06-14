<script lang="ts">
    import { type UniquePokemon } from "../../lib/poketypes.js";
    import PokemonImage from "./PokemonImage.svelte";

    const {
        p,
        size,
        onclick = () => {}
    } : {
        p: UniquePokemon,
        size: 'small' | 'medium' | 'large',
        onclick?: (e: MouseEvent, p: UniquePokemon) => void
    } = $props()

    console.log("p:", $state.snapshot(p))

</script>

<button class="pokemon-button {size}" onclick={e => onclick(e, p)}>
    {#if size === 'small'}
        <PokemonImage p={p} crop="small" />
    {:else if size === 'medium'}
        <PokemonImage p={p} crop="medium" />
        <p>{p.name}</p>
    {:else if size === 'large'}
        <PokemonImage p={p} />        
        <p>{p.name}</p>
    {/if}
</button>

<style>
    .pokemon-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>