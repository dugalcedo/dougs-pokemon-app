// This state keeps track of the player data

import { type PlayerData, API_ROOT, getStarterMoves } from "../backend.js"
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

        console.log(`Loaded player data:`, data)
        console.log(`Player:`, $state.snapshot(player))
        
    } catch (error) {
        console.log(`Error when trying to load player data.`)
        console.log(error)
    }
}

export const syncPlayer = async () => {

}

export const startGame = async () => {

}