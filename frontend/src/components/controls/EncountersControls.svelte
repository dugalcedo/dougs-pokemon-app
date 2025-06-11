<script lang="ts">
    import { view } from "../../lib/state/view.svelte.js";
    import Control from "./Control.svelte";
</script>

{#if view.encountered}
    <Control screen="fight" controls="fight">
        Fight
    </Control>
{/if}