<script lang="ts">
    import { type Pokemon, pokemonTypeToColor } from "../../lib/pokemonTypes.js";

    const {
        p,
    } : {
        p: Pokemon,
    } = $props()

    const types = $derived(p.types.map(t => t.type.name))

</script>

{#each types as type (type)}
{@const color = pokemonTypeToColor(type)}
    <span class="pokemon-type-badge" style="
        background-color: {color};
        border: 1px outset {color};
    ">
        {type}
    </span>
{/each}

<style>
    .pokemon-type-badge {
        display: inline-block;
        font-size: .8rem;
        color: white;
        font-family: monospace;
        text-shadow: 1px 1px 0 black;
        padding: .1rem .5rem;
        border-radius: 3px;
    }
</style>