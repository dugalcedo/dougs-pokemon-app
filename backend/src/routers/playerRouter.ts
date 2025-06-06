import { Router } from "express";
import handle from "../util/handle.ts";
import { Player, PlayerPokemon } from "../models/_models.ts";
import { sequelize } from "../db/sequelize.ts";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import env from "../util/env.ts"

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

// CHECK TOKEN
playerRouter.get('/checkToken', handle(async (req, res) => {
    if (!req.user) throw {
        status: 401,
        message: "Invalid token."
    }

    return {
        status: 200,
        message: "User data retreived",
        data: req.user
    }
}))

// SYNC PLAYER
playerRouter.put('/sync', handle(async (req, res) => {

    const player = await Player.findByPk(req.body.id)

    if (!player) throw {
        status: 404,
        message: "Player not found"
    }

    const result = await player.sync(req.body, req.body.pokemon)
    
    return result
}))

export default playerRouter