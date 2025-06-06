<script lang="ts">
    import { view, screens } from "../../lib/state/view.svelte.js";

    let Screen = $derived(screens[view.screenName])
</script>

<div id="screen">
    <Screen />
</div>