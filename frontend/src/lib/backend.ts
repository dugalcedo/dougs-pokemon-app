export const API_ROOT = "http://localhost:6392"
import { type Pokemon, type RegionEncounters, type Encounter } from "./pokemonTypes.js"
import type { UniquePokemon } from "./poketypes.js"


export type PlayerData = {
    id: number
    name: string
    password: string
    hasStarted: boolean
    region: string
    regionEncounters: RegionEncounters
    pokemon: UniquePokemon[]
}

export const pokeAPIFetch = (path: string) => {
    return fetch(API_ROOT + '/pokeapi' + path)
}

export const instantiateEncounteredPokemon = async (enc: Encounter): Promise<UniquePokemon> => {
    const res = await fetch(API_ROOT + `/api/encounter/${enc.pokemon}/${enc.minLvl}/${enc.maxLvl}`)
    const data = await res.json()
    return data.data
}

export const getStarterMoves = async (p: Pokemon) => {
    
}

