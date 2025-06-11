<script lang="ts">
    import type { UniquePokemon } from "../../lib/poketypes.js";
    import { view } from "../../lib/state/view.svelte.js";
    import { player } from "../../lib/state/player.svelte.js";
    import Opponent from "../pokemon/Opponent.svelte";
    import Self from "../pokemon/Self.svelte";

    let messages: string[] = $state([])
    let self: UniquePokemon = $state(player.data!.pokemon[0])
    let opponent: UniquePokemon = $state(view.encounteredPokemon!)

    view.turnPokemon = self
    view.turnName = 'self'

    messages.push(`A wild ${opponent.name} appeared! Choose a move.`)

</script>

<div class="arena">
    <div class="fighters">
        <Opponent />
        <div class="message">{messages[messages.length-1]}</div>
        <Self />
    </div>
</div>

<style>
    .arena {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .fighters {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
</style>
