<script lang="ts">
    import { view } from "../../lib/state/view.svelte.js";
</script>

{#if view.turnName === null}
    <p class="message">{view.messageLog[view.messageLog.length-1]}</p>
{:else if view.turnName === 'self'}
    <div class="controls">
        {#each view.turnPokemon!.knownMoves as move (move.name)}
            <button>
                {move.name}
            </button>
        {/each}
    </div>
{:else}
    <p class="message">{view.messageLog[view.messageLog.length-1]}</p>
{/if}