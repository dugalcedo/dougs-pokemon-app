export const API_ROOT = "http://localhost:6392"
import { type Pokemon } from "./pokemonTypes.js"

export type PlayerData = {
    id: number
    name: string
    password: string
    hasStarted: boolean
    region: string
}

export const pokeAPIFetch = (path: string) => {
    return fetch(API_ROOT + '/pokeapi' + path)
}

export const getPokemonCache = (): Record<string, Pokemon> => {
    return JSON.parse(localStorage.getItem('dpa::pokemon') || "{}") || {}
}

export const cachePokemon = (p: Pokemon) => {
    const cache = getPokemonCache()
    cache[p.id] = p
    localStorage.setItem('dpa::pokemon', JSON.stringify(cache))
}

export const getCachedPokemon = async (id: number | string): Promise<Pokemon> => {
    const cache = getPokemonCache()
    if (cache[id]) return cache[id];

    const res = await pokeAPIFetch(`/pokemon/${id}`)
    const data = await res.json()
    const p = data.data
    cachePokemon(p)
    return p
}