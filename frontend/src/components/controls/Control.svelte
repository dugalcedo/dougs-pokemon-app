<script lang="ts">
    import type { Snippet } from "svelte";
    import { type ScreenName, type ControlsName, setView } from "../../lib/state/view.svelte.js";

    const {
        screen,
        controls,
        callback,
        children
    } : {
        screen?: ScreenName,
        controls?: ControlsName,
        callback?: Function,
        children: Snippet 
    } = $props()

    const handleClick = () => {
        setView({ screen, controls })

        if (callback) {
            callback()
        }
    }

</script>

<button onclick={handleClick}>
    {@render children()}
</button>