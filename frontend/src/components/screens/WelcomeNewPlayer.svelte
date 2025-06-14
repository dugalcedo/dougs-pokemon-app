<script lang="ts">
    import { player } from "../../lib/state/player.svelte.js";
    import { setView } from "../../lib/state/view.svelte.js";

    setTimeout(() => {
        setView({
            screen: 'pickRegion',
            controls: 'none'
        })
    }, 2000);
</script>

{#if !player.data}
    ...
{:else}
    <div class="center">
        <h3>Welcome to the world of pokemon, <span style="color: teal;">{player.data.name}</span>.</h3>
    </div>
{/if}

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>