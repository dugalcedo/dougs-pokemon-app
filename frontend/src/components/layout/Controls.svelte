<script lang="ts">
    import { view, controls } from "../../lib/state/view.svelte.js";
    let Controls = $derived(controls[view.controlsName])
</script>

<div id="controls">
    <Controls />
</div>

<style>
    :global(.controls) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100%;
        gap: .5rem;
    }
</style>