import { Router } from "express";
import handle from "../util/handle.ts";
import { Player, PlayerPokemon } from "../models/_models.ts";
import { sequelize } from "../db/sequelize.ts";
import type { UserData } from "../../types";
import type { Request } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from "../util/env.ts"
import fs from 'fs'

const playerRouter = Router()

//  NEW GAME
playerRouter.post('/', handle(async (req, res) => {
    const existingPlayer = await Player.findOne({ where: { name: req.body.name }})

    if (existingPlayer) throw {
        status: 401,
        message: "name taken"
    }

    const newPlayer = await Player.create({
        name: req.body.name,
        password: req.body.password
    })

    return {
        status: 201,
        message: "Player created",
        data: {
            player: newPlayer.dataValues,
            token: jwt.sign(newPlayer.dataValues, env.JWT_SECRET)
        }
    }
}))

// LOAD GAME
playerRouter.put('/', handle(async (req, res) => {
    const player = await Player.findOne({ where: { name: req.body.name }})

    if (!player) throw {
        status: 401,
        message: "Invalid credentials"
    }

    const validPwd = await bcrypt.compare(req.body.password, player.dataValues.password)

    if (!validPwd) throw {
        status: 401,
        message: "Invalid credentials"
    }

    return {
        status: 200,
        message: "Player retreived",
        data: {
            player: player.dataValues,
            token: jwt.sign(player.dataValues, env.JWT_SECRET)
        }
    }
}))

const getPlayerDataFromRequest = async (req: Request): Promise<UserData> => {
    if (!req.headers.authorization) throw {
        status: 401,
        message: "You need an authorization header."
    }

    const [authType, token] = req.headers.authorization.split(' ')

    if (!authType || authType.toLowerCase() !== 'bearer') throw {
        status: 401,
        message: "Authorization header must be bearer."
    }

    if (!token) throw {
        status: 401,
        message: "Invalid token. Type was defined but token was not."
    }

    let parsed: any
    try {
        parsed = jwt.verify(token, env.JWT_SECRET)
    } catch {
        throw {
            status: 401,
            message: "Invalid token. Failed parsing."
        }
    }

    const player = await Player.findByPk(parsed.id)

    if (!player) throw {
        status: 401,
        message: "Invalid token. Failed finding player."
    }

    const pps = await PlayerPokemon.findAll({
        where: { playerId: player.dataValues.id }
    })

    const regionEncounters = JSON.parse(fs.readFileSync(`cache/encounters.json`, 'utf-8'))[player.dataValues.region]
    regionEncounters.locations.sort((a: any, b: any) => a.avgLvl - b.avgLvl)

    return {
        ...player.dataValues,
        pokemon: await Promise.all(pps.map(pp => pp.toUniquePokemon())),
        regionEncounters: regionEncounters
    }
}

// CHECK TOKEN
playerRouter.get('/checkToken', handle(async (req, res) => {
    const playerData = await getPlayerDataFromRequest(req)

    return {
        status: 200,
        message: "User data retreived",
        data: playerData
    }
}))

// SYNC PLAYER
playerRouter.put('/sync', handle(async (req, res) => {

    const player = await Player.findByPk(req.body.id)

    if (!player) throw {
        status: 404,
        message: "Player not found"
    }

    const result = await player.sync(req.body)
    
    return result
}))

export default playerRouter