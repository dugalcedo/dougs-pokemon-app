import type { Pokemon } from "./pokemonTypes.js"

export function playPokemonSound(p: Pokemon) {
    const audioEl = document.createElement('audio')
    audioEl.src = p.cries.latest
    audioEl.play()
}