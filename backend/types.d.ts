declare namespace Express {

    type UserData = {
        id: number
        name: string
        password: string
        pokemon: number[]
    }

    interface Request {
        user?: UserData
    }
}