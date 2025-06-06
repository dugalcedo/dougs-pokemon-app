<script lang="ts">
    import Control from "./Control.svelte";
    import { player } from "../../lib/state/player.svelte.js";
</script>

<div class="controls">
    {#if player.data}
        <Control screen="dashboard" controls="dashboard">
            Continue Game
        </Control>
    {/if}

    <Control screen="newGame" controls="back">
        New game
    </Control>
    
    <Control screen="loadGame" controls="back">
        Load game
    </Control>
    
    <Control>
        About
    </Control>
</div>