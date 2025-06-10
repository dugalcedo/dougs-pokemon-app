// This state keeps track of the player data

import { type PlayerData, API_ROOT, getCachedPokemon, getStarterMoves, getCachedMove } from "../backend.js"
import type { Pokemon, PlayerPokemon } from "../pokemonTypes.js"
import { getPokemonMaxHp, getPokemonStat } from "../util.js"

type PlayerState = {
    data: PlayerData | null
    pokemon: Pokemon[]
}

export const player = $state<PlayerState>({
    data: null,
    pokemon: []
})


export const logIn = (token: string, data: PlayerData) => {
    localStorage.setItem('dpa::token', token)
    player.data = data
}

export const loadPlayerData = async () => {
    console.log("Loading player data...")
    try {
        const token = localStorage.getItem('dpa::token')
        if (!token) {
            console.log("No token.")
            return
        }

        const res = await fetch(API_ROOT + "/api/player/checkToken", {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            console.log("Bad response.")
            return
        }

        const data = await res.json()
        player.data = data.data
        player.pokemon = await Promise.all(data.data.pokemon.map(async (pp: PlayerPokemon) => {
            const pokemon = await getCachedPokemon(pp.id)

            const p = {
                ...pokemon,
                ...pp
            }
            
            // stats
            p.maxHp = getPokemonMaxHp(p as unknown as Pokemon)
            p.speed = getPokemonStat(p as unknown as Pokemon, 'speed')
            p.defense = getPokemonStat(p as unknown as Pokemon, 'defense')
            p.attack = getPokemonStat(p as unknown as Pokemon, 'attack')

            // moves
            p.fullMoves = await Promise.all(pp.moves.map(id => {
                return getCachedMove(id)
            }))


            return p
        }))

        console.log(`Loaded player data:`, data)
        console.log(`Player:`, $state.snapshot(player))
        
    } catch (error) {
        console.log(`Error when trying to load player data.`)
        console.log(error)
    }
}

export const syncPlayer = async () => {
    const res = await fetch(API_ROOT + "/api/player/sync", {
        method: 'PUT',
        body: JSON.stringify({
            ...$state.snapshot(player.data),
            pokemon: player.pokemon.map(p => p.id)
        })
    })

    const data = await res.json()

    console.log("syncPlayer result:", data)

    return data
}

export const startGame = async (region: string, pokemon: Pokemon) => {
    player.data!.hasStarted = true
    player.data!.region = region
    
    player.pokemon.push({
        ...pokemon,
        id: pokemon.id,
        level: 5,
        hp: 1,
        exp: 0,
        fullMoves: await getStarterMoves(pokemon)
    })
    syncPlayer()
}