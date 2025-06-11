<script lang="ts">
    import type { UniquePokemon } from "../../lib/poketypes.js";

    const {
        p,
        crop,
        back = false
    } : {
        p: UniquePokemon,
        crop?: "small" | "medium",
        back?: boolean
    } = $props()

    let size = crop === "small" ? 48 : crop === "medium" ? 64 : 96;

</script>

<div class="pokemon-image" role="img" style="
    width: {size}px;
    height: {size}px;
    background-image: url('{back ? p.sprites.back : p.sprites.front}');
    object-fit: cover;
    background-position: center;
    border-radius: 50%;
"></div>
