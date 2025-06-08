<script lang="ts">
    import { view } from "../../lib/state/view.svelte.js";
    import Control from "./Control.svelte";
</script>

{#if view.encountered}
    <Control>
        Fight for exp
    </Control>
    <Control>
        Fight for catch
    </Control>
{/if}