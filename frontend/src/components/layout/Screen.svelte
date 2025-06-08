<script lang="ts">
    import { view, screens } from "../../lib/state/view.svelte.js";

    let Screen = $derived(screens[view.screenName])
</script>

<div id="screen">
    <Screen />
</div>

<style>
    #screen {
        height: 100%;
        overflow-y: hidden;
    }
</style>