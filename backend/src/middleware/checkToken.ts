import { RequestHandler } from "express"
import { Player, PlayerPokemon } from "../models/_models.ts"
import jwt from 'jsonwebtoken'
import env from "../util/env.ts"

export const checkToken: RequestHandler = async (req, _res, next) => {
    console.log("Checking token...")
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            console.log("No auth header.")
            next()
            return
        }

        const [authType, token] = authHeader.split(' ')

        if (authType != 'Bearer') {
            console.log("Wrong auth type.")
            next()
            return
        }

        if (!token) {
            console.log("Correct auth type but missing token.")
            next()
            return
        }

        let parsed: any
        try {
            parsed = jwt.verify(token, env.JWT_SECRET)
        } catch (error) {
            console.log("Failed parsing token.")
            console.log(error)
            next()
            return
        }

        if (typeof parsed != 'object') {
            console.log("Parsed token is not an object.")
            next()
            return
        }

        if (!parsed.name || !parsed.password) {
            console.log("Token is missing name and/or password.")
            next()
            return
        }

        const player = await Player.findOne({ where: { name: parsed.name } })

        if (!player) {
            console.log("Valid token but invalid name. Maybe the name changed?")
            next()
            return
        }

        req.user = player.dataValues

        // get player pokemon
        const playerPokemon = await PlayerPokemon.findAll({ where: { playerId: req.user!.id } })
        req.user!.pokemon = playerPokemon.map(pp => pp.dataValues)

        next()

    } catch (error) {
        console.log(`Failed checking token`)
        console.log(error)
        next()
    }
}