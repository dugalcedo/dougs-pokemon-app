export interface PokeAPIDTO {
    name: string
    id: number
    allMoves: string[]
    types: string[]
    cry: string
    sprites: {
        front: string
        back: string
    }
}

export type Effect = {
    target: 'self' | 'opponent'
    status: string
    amount: number
}

export type Move = {
    name: string
    power: null | number
    accuracy: number
    effects: Effect[]
}

export interface UniquePokemon extends PokeAPIDTO {
    level: number
    hp: number
    knownMoves: Move[]
    exp: number
}