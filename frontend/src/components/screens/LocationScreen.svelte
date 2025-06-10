<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
    import { view } from "../../lib/state/view.svelte.js";
    import { goToEncounters } from "../../lib/state/view.svelte.js";

    let location = $derived(player.data?.regionEncounters.locations.find(loc => loc.name === view.location))
    console.log("location:", location)
</script>

{#if !player.data}
    no player
{:else if !location}
    no location
{:else}
    <div class="location">
        <h2>{location.name}</h2>
        <h4>Pick an area to search for Pokémon</h4>
        <div class="heading row">
            <strong>NAME</strong>
            <strong>LVL</strong>
            <strong>CLR</strong>
            <strong></strong>
        </div>
        <div class="areas">
            {#each location.areas as area (area.name)}
                <div class="area row">
                    <div class="name">{area.name}</div>
                    <div class="lvl">{Math.round(area.avgLvl)}</div>
                    <div class="clear"></div>
                    <button onclick={() => {
                        goToEncounters(location.name, area.name)
                    }}>
                        Go
                    </button>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .location {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .heading {
        font-size: .7rem;

        border-bottom: 3px solid lightgray;
        margin-bottom: 5px;

        & > strong {
            text-align: center;
        }
    }

    .areas {
        flex-grow: 1;
        overflow-y: auto;
    }

    .row {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr;
        gap: .25rem;
    }

    .area, .area button {
        font-size: .8rem;
    }

    .area > *:not(:last-child) {
        border-right: 1px solid lightgray;
    }

    .lvl {
        text-align: center;
    }
</style>