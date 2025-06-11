import express from 'express'
import env from './util/env.ts'
import handle from './util/handle.ts'
import cors from 'cors'
import seed from './scripts/seed.ts'
import { syncDB, testDB } from './db/sequelize.ts'

const app = express()

// middleware
app.use(cors())
app.use(express.json({ type: '*/*' }))

// logger
app.use((req, res, next) => {
    console.log(`----- New request heard: ${req.method} ${req.url} -----\n`)

    console.log('Token:', req.headers.authorization)
    console.log('Body:', req.body)
    console.log('Params:', req.params)
    console.log('Query:', req.query)

    res.on('finish', () => {
        console.log(`\n----- End of request: ${req.method} ${req.url} -----\n|\n|\n|`)
    })


    next()
})


// routers
import pokeAPI from './routers/pokeAPIrouter.ts'
app.use("/pokeapi", pokeAPI)
import playerRouter from './routers/playerRouter.ts'
app.use("/api/player", playerRouter)
import encounterRouter from './routers/encounterRouter.ts'
app.use("/api/encounter", encounterRouter)

// 404 route
app.use(/(.+)/, handle(() => {
    return {
        status: 404,
        message: "Route does not exist"
    }
}))

// start function
async function start() {
    await testDB()
    await syncDB()
    await seed()
    app.listen(env.PORT, () => {
        console.log(`Server started. http://localhost:${env.PORT}`)
    })
}; start()