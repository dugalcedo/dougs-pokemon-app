import { Router } from "express";
import handle from "../util/handle.ts";
import { cache, getCached } from "../util/cache.ts";
import env from "../util/env.ts";
import fs from 'fs'

const ROOT = "https://pokeapi.co/api/v2"

const pokeAPI = Router()

pokeAPI.get("/regionsAndStarters", handle(async (req) => {
    const cached = getCached('regionsAndStarters')
    if (cached) return {
        status: 200,
        message: `Regions and starters retreived`,
        data: cached
    }

    // REGIONS
    const regionsRes = await fetch(ROOT + "/region")
    const regionsData = await regionsRes.json()
    const regions = regionsData.results.filter((r: any) => r.name !== 'hisui')

    // STARTERS
    const starterPokemonIds: Record<string, string[]> = {
        kanto: ['bulbasaur', 'charmander', 'squirtle'],
        johto: ['chikorita', 'cyndaquil', 'totodile'],
        hoenn: ['treecko', 'torchic', 'mudkip'],
        sinnoh: ['turtwig', 'chimchar', 'piplup'],
        unova: ['snivy', 'tepig', 'oshawott'],
        kalos: ['chespin', 'fennekin', 'froakie'],
        alola: ['rowlet', 'litten', 'popplio'],
        galar: ['grookey', 'scorbunny', 'sobble'],
        paldea: ['sprigatito', 'fuecoco', 'quaxly']
    }
    
    for (const region of regions) {
        const res = await fetch(env.THIS_ROOT + `/pokeapi/pokemon/multiple/${starterPokemonIds[region.name].join(',')}`)
        if (!res.ok) throw {
            status: 500,
            message: (await res.json()).message
        }
        const pokemon = (await res.json()).data
        region.starters = pokemon
    }

    cache('regionsAndStarters', regions)

    return {
        status: 200,
        message: `Regions and starters retreived`,
        data: regions
    }
}))

pokeAPI.get("/pokemon/multiple/:ids", handle(async (req) => {
    const ids = req.params.ids.split(',')

    const pokemons: any[] = []

    for (const id of ids) {
        const res = await fetch(env.THIS_ROOT + `/pokeapi/pokemon/${id}`)
        console.log(id)
        if (!res.ok) {
            throw {
                status: 404,
                message: `Pokemon "${id}" not found.`
            }
        }
        const data = await res.json()
        pokemons.push(data.data)
    }

    return {
        status: 200,
        message: "Pokemon retreived",
        data: pokemons
    }
}))

const encounters = JSON.parse(fs.readFileSync(`cache/encounters.json`, 'utf-8'))
pokeAPI.get("/encounters/:region", handle(async (req) => {
    const regionEncounters = encounters[req.params.region]

    if (!regionEncounters) throw {
        status: 404,
        message: "Invalid region"
    }

    return {
        status: 200,
        message: "Encounters retreived",
        data: regionEncounters
    }
}))

pokeAPI.get(/(.+)/, handle(async (req) => {
    const res = await fetch(ROOT + req.url)

    if (!res.ok) throw {
        status: 404,
        message: "Not found"
    }

    const data = await res.json()

    return {
        status: 200,
        message: "PokeAPI data retreived.",
        data
    }
}))

export default pokeAPI