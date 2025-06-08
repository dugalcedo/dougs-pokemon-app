<script lang="ts">
    import Control from "./Control.svelte";
    import { player } from "../../lib/state/player.svelte.js";
    import BackButton from "./BackButton.svelte";
</script>

<div class="controls">
    <BackButton />
    {#if !player.data}
        ...
    {:else if !player.data.hasStarted}
        <Control screen="pickRegion" controls="none">
            Pick region
        </Control>
    {:else}
        <Control screen="overworld" controls="overworld">
            Overworld
        </Control>
    {/if}
</div>