<script lang="ts">
    import { view, displayBattleMessages } from "../../lib/state/view.svelte.js";
    import { attack } from "../../lib/battle.js";
</script>

{#if view.turnName === null}
    <p class="message">{view.messageLog[view.messageLog.length-1]}</p>
{:else if view.turnName === 'self'}
    <div class="controls">
        {#each view.turnPokemon!.knownMoves as move (move.name)}
            <button onclick={() => {
                const messages = attack(view.turnPokemon!, view.encounteredPokemon!, move)
                displayBattleMessages(messages)
            }}>
                {move.name}
            </button>
        {/each}
    </div>
{:else}
    <p class="message">{view.messageLog[view.messageLog.length-1]}</p>
{/if}