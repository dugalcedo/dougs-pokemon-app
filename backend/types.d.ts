import { UniquePokemon } from "./poketypes.ts"


export type RegionEncounters = {
    name: string,
    locations: {
        name: string,
        id: number,
        region: { name: string, url: string },
        avgLvl: number,
        areas: {
            name: string,
            avgLvl: number,
            encounterWheel: {
                pokemon: string,
                minLvl: number,
                maxLvl: number,
                chanceFloor: number,
                chanceCeil: number,
                chance: number
            }[]
        }[]
    }[]
}

export type UserData = {
    id: number
    name: string
    password: string
    pokemon: UniquePokemon[]
    region: string
    regionEncounters?: RegionEncounters
}

