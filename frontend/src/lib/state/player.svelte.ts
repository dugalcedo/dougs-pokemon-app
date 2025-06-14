// This state keeps track of the player data

import { type PlayerData, API_ROOT } from "../backend.js"
import { type UniquePokemon } from "../poketypes.js"

type PlayerState = {
    data: PlayerData | null
}

export const player = $state<PlayerState>({
    data: null
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

        console.log(`DATA:`, data)

        player.data = data.data
        
    } catch (error) {
        console.log(`Error when trying to load player data.`)
        console.log(error)
    }
}

export const syncPlayer = async () => {

    const res = await fetch(API_ROOT + "/api/player/sync", {
        method: "PUT",
        body: JSON.stringify($state.snapshot(player.data||{}))
    })

    if (!res.ok) {
        return false
    }

    return true
}

export const startGame = async (regionName: string, p: UniquePokemon) => {
    console.log("PLAYER DATA", $state.snapshot(player.data))
    if (typeof player.data!.pokemon === 'string') player.data!.pokemon = []
    player.data!.region = regionName
    player.data!.hasStarted = true
    if (!player.data!.pokemon) player.data!.pokemon = []
    player.data!.pokemon.push(p)
    const success = await syncPlayer()
    window.location.reload()
    return success
}