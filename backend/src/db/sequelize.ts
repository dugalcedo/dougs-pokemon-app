import { Sequelize } from 'sequelize'
import env from '../util/env.ts'

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/db.sqlite",
    logging: false
})

export async function testDB() {
    console.log(`Testing DB connection...`)
    try {
        await sequelize.authenticate()
        console.log(`DB authenticated`)
        return true
    } catch (error) {
        console.log(`Failed DB authentication`)
        console.log(error)
        return false
    }
}

export async function syncDB() {
    console.log(`Synchronizing DB...`)
    try {
        const conn = await sequelize.sync({ force: env.DEV })
        console.log(`Connected to DB`)
        return conn
    } catch (error) {
        console.log(`Failed connecting to DB`)
        console.log(error)
    }
}