export const API_ROOT = "http://localhost:6392"
import { type Pokemon, type RegionEncounters, type Encounter, type FullMove } from "./pokemonTypes.js"
import { randRange, getPokemonMaxHp, getIdFromURL, shuffle } from "./util.js"

export type PlayerData = {
    id: number
    name: string
    password: string
    hasStarted: boolean
    region: string
    regionEncounters: RegionEncounters
}

export const pokeAPIFetch = (path: string) => {
    return fetch(API_ROOT + '/pokeapi' + path)
}

export const getPokemonCache = (): Record<string, Pokemon> => {
    return JSON.parse(localStorage.getItem('dpa::pokemon') || "{}") || {}
}

export const getMoveCache = (): Record<string, FullMove> => {
    return JSON.parse(localStorage.getItem('dpa::moves') || "{}") || {}
}

export const cachePokemon = (p: Pokemon) => {
    const cache = getPokemonCache()
    cache[p.id] = p
    localStorage.setItem('dpa::pokemon', JSON.stringify(cache))
}

export const cacheMove = (m: FullMove) => {
    const cache = getMoveCache()
    cache[m.id] = m
    localStorage.setItem('dpa::moves', JSON.stringify(cache))
}

export const getCachedPokemon = async (id: number | string): Promise<Pokemon> => {
    // const cache = getPokemonCache()
    // if (cache[id]) return cache[id];

    const res = await pokeAPIFetch(`/pokemon/${id}`)
    const data = await res.json()
    const p = data.data
    // cachePokemon(p)
    return p
}

export const getCachedMove = async (id: number | string): Promise<FullMove> => {
    // const cache = getMoveCache()
    // if (cache[id]) return cache[id];

    const res = await pokeAPIFetch(`/move/${id}`)
    const data = await res.json()
    const m = data.data
    // cacheMove(m)
    return m
}

export const instantiateEncounteredPokemon = async (enc: Encounter) => {
    console.log(`INSTANTIATING encountered pokemon. Downloading pokemon data..`)

    const p = await getCachedPokemon(enc.pokemon)

    console.log(`Pokemon downloaded: ${p.name}`)

    p.level = Math.round(randRange(enc.minLvl, enc.maxLvl))
    p.maxHp = getPokemonMaxHp(p)

    // console.log({enc, p})

    // get moves
    const learnableMoves = p.moves.filter(m => {
        const lla = m.version_group_details[0].level_learned_at
        return lla <= p.level && lla > 0
    })
    
    console.log(`Downloading moves...`)
    p.fullMoves = await Promise.all(learnableMoves.map(m => {
        return getCachedMove(m.move.name)
    }))
    shuffle(p.fullMoves)

    // only attack moves
    p.fullMoves = p.fullMoves.filter(m => m.power && (m.power > 0)).slice(0, 4)

    return p
}


export const getStarterMoves = async (p: Pokemon) => {
    const moves = p.moves.filter(m => m.version_group_details[0].level_learned_at === 1)
    const fullMoves = await Promise.all(moves.map(m => {
        return getCachedMove(m.move.name)
    }))
    const attacks = fullMoves.filter(m => m.power && (m.power > 0))
    return attacks
}

