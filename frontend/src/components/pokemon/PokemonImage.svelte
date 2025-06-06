<script lang="ts">
    import type { Pokemon } from "../../lib/pokemonTypes.js";

    const {
        p,
        crop
    } : {
        p: Pokemon,
        crop?: "small" | "medium"
    } = $props()

    let size = crop === "small" ? 48 : crop === "medium" ? 64 : 96;

</script>

<div class="pokemon-image" role="img" style="
    width: {size}px;
    height: {size}px;
    background-image: url('{p.sprites.front_default}');
    object-fit: cover;
    background-position: center;
    border-radius: 50%;
"></div>
