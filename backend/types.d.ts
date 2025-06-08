declare namespace Express {

    type RegionEncounters = {
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

    type UserData = {
        id: number
        name: string
        password: string
        pokemon: number[]
        region: string
        regionEncounters?: RegionEncounters
    }

    interface Request {
        user?: UserData
    }
}