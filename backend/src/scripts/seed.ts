import { Player } from "../models/_models.ts";

const players = [
    { 
        name: "dug", 
        password: "dug1234", 
        hasStarted: true, 
        region: "johto",
        pokemon: `[
            { 
                "id": 158,
                "moves": ["10"],
                "hp": 1,
                "level": 5,
                "exp": 0
            }
        ]`
    },
    { name: "sundraz", password: "beanbrain" },
    { name: "jordan", password: "dreamie" }
]

export default async function seed() {

    console.log("Seeding players...")
    for (const player of players) {
        console.log(`\tSeeding player "${player.name}"`)
        try {
            await Player.create(player)
        } catch (error) {
            console.log(`Failed seeding "${player.name}"`)
            console.log((error as any)?.message)
        }
    }
    console.log("Finished seeding players.")


}