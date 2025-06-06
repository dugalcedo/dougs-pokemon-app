<script lang="ts">
    import Control from "./Control.svelte";
    import { goBack } from "../../lib/state/view.svelte.js";
</script>

<Control callback={goBack}>
    &larr; Back
</Control>