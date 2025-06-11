export interface PokeAPIDTO {
    name: string
    id: number
    allMoves: DTOMove[]
    types: string[]
    cry: string
    sprites: {
        front: string
        back: string
    }
}

export type DTOMove = {
    name: string,
    level_learned: number
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

import tryFetch from "./src/util/tryFetch.ts"

export async function fetchPokeAPIDTO(id: number | string): Promise<PokeAPIDTO> {
    const p = await tryFetch(5, () => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
    return {
        name: p.name,
        id: p.id,
        allMoves: p.moves.map((m: any) => {
            const move: DTOMove = {
                name: m.move.name,
                level_learned: m.version_group_details[0].level_learned_at
            }
            return move
        }),
        types: p.types.map((t: any) => t.type.name),
        cry: p.cries.latest,
        sprites: {
            front: p.sprites.front_default,
            back: p.sprites.back_default
        }
    }
}

export async function fetchMove(name: string): Promise<Move> {
    const m = await tryFetch(5, () => fetch(`https://pokeapi.co/api/v2/move/${name}`))
    const effects: Effect[] = []

    m.stat_changes.forEach((sc: any) => {
        effects.push({
            amount: Math.abs(sc.change),
            status: sc.stat.name,
            target: sc.change > 0 ? 'self' : 'opponent'
        })
    })

    return {
        name: m.name,
        power: m.power,
        accuracy: m.accuracy,
        effects
    }
}
