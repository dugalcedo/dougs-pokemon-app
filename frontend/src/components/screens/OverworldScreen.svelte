<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
    import { goToLocation } from "../../lib/state/view.svelte.js";
</script>

{#if !player.data}
    ...
{:else}
    <div class="overworld">
        <h3>Choose a location</h3>
        <div class="heading row">
            <strong>NAME</strong>
            <strong>LVL</strong>
            <strong>CLEAR?</strong>
            <strong></strong>
        </div>
        <div class="locations">
            {#each player.data.regionEncounters.locations as loc (loc.name)}
                <div class="location row">
                    <div class="name">{loc.name}</div>
                    <div class="lvl">lvl {loc.avgLvl}</div>
                    <div></div>
                    <button onclick={() => goToLocation(loc.name)}>Go</button>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .overworld {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .heading {
        font-size: .7rem;
        margin-right: 14px;
        border-bottom: 3px solid lightgray;
        margin-bottom: 5px;

        & > strong {
            text-align: center;
        }
    }

    .locations {
        flex-grow: 1;
        overflow-y: auto;
    }

    .row {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr;
        gap: .25rem;
    }

    .location, .location button {
        font-size: .8rem;
    }

    .location > *:not(:last-child) {
        border-right: 1px solid lightgray;
    }

    .lvl {
        text-align: center;
    }
</style>