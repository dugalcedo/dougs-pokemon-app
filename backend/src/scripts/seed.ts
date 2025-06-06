import { Player, PlayerPokemon } from "../models/_models.ts";

const players = [
    { name: "dug", password: "dug1234", hasStarted: true, region: "johto" },
    { name: "sundraz", password: "beanbrain" },
    { name: "jordan", password: "dreamie" }
]

const playerPokemon = [
    { playerId: 1, pokemonId: 158 }
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


    console.log("Seeding player pokemon...")
    for (const pp of playerPokemon) {
        try {
            await PlayerPokemon.create(pp)
        } catch (error) {
            console.log(`Failed seeding:`, pp)
            console.log((error as any)?.message)
        }
    }
    console.log("Finished seeding player pokemon.")
}