import { Router } from "express";
import handle from "../util/handle.ts"
import { type UniquePokemon, type Move, fetchPokeAPIDTO } from "../../poketypes.ts";
import { getRandomMoves } from "../util/poke.ts";


const randRange = (min: number, max: number) => Math.floor(Math.random()*(max+1-min))+min;

const encounterRouter = Router()

encounterRouter.get("/:name/:minLvl/:maxLvl", handle(async (req, res) => {
    const { name, minLvl, maxLvl } = req.params

    console.log("Fetching pokeAPIDTO...")
    const p = await fetchPokeAPIDTO(name)

    const up: UniquePokemon = {
        ...p,
        level: randRange(parseInt(minLvl), parseInt(maxLvl)),
        hp: 1,
        exp: 0,
        knownMoves: []
    }

    console.log("Getting random moves...")
    up.knownMoves = await getRandomMoves(p, up)

    return {
        status: 200,
        message: "Unique Pokemon retreived.",
        data: up
    }
}))

export default encounterRouter