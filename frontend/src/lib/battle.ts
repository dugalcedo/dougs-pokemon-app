import type { FullMove, Pokemon } from "./pokemonTypes.js";



export const typeFactorMap: any = {
    normal: {
        rock: 0.5,
        ghost: 0,
        steel: 0.5
    },
    fire: {
        fire: 0.5,
        water: 0.5,
        grass: 2,
        ice: 2,
        bug: 2,
        rock: 0.5,
        dragon: 0.5,
        steel: 2
    },
    water: {
        fire: 2,
        water: 0.5,
        grass: 0.5,
        ground: 2,
        rock: 2,
        dragon: 0.5
    },
    grass: {
        fire: 0.5,
        water: 2,
        grass: 0.5,
        poison: 0.5,
        ground: 2,
        flying: 0.5,
        bug: 0.5,
        rock: 2,
        dragon: 0.5,
        steel: 0.5
    },
    electric: {
        water: 2,
        electric: 0.5,
        grass: 0.5,
        ground: 0,
        flying: 2,
        dragon: 0.5
    },
    ice: {
        fire: 0.5,
        water: 0.5,
        grass: 2,
        ice: 0.5,
        ground: 2,
        flying: 2,
        dragon: 2,
        steel: 0.5
    },
    fighting: {
        normal: 2,
        ice: 2,
        poison: 0.5,
        flying: 0.5,
        psychic: 0.5,
        bug: 0.5,
        rock: 2,
        ghost: 0,
        dragon: 1,
        steel: 2,
        fairy: 0.5
    },
    poison: {
        grass: 2,
        poison: 0.5,
        ground: 0.5,
        rock: 0.5,
        ghost: 0.5,
        steel: 0,
        fairy: 2
    },
    ground: {
        fire: 2,
        electric: 2,
        grass: 0.5,
        poison: 2,
        flying: 0,
        bug: 0.5,
        rock: 2,
        steel: 2
    },
    flying: {
        electric: 0.5,
        grass: 2,
        fighting: 2,
        bug: 2,
        rock: 0.5,
        steel: 0.5
    },
    psychic: {
        fighting: 2,
        poison: 2,
        psychic: 0.5,
        dark: 0,
        steel: 0.5
    },
    bug: {
        fire: 0.5,
        fighting: 0.5,
        grass: 2,
        poison: 0.5,
        flying: 0.5,
        psychic: 2,
        ghost: 0.5,
        steel: 0.5,
        fairy: 0.5
    },
    rock: {
        fire: 2,
        ice: 2,
        fighting: 0.5,
        ground: 0.5,
        flying: 2,
        bug: 2,
        steel: 0.5
    },
    ghost: {
        normal: 0,
        fighting: 0,
        poison: 1,
        bug: 1,
        ghost: 2,
        dark: 0.5
    },
    dragon: {
        dragon: 2,
        steel: 0.5,
        fairy: 0
    },
    steel: {
        fire: 0.5,
        water: 0.5,
        electric: 0.5,
        ice: 2,
        rock: 2,
        steel: 0.5,
        fairy: 2
    },
    dark: {
        fighting: 0.5,
        psychic: 2,
        ghost: 2,
        dark: 0.5,
        fairy: 0.5
    },
    fairy: {
        fighting: 2,
        poison: 0.5,
        steel: 0.5,
        fire: 0.5,
        dragon: 2,
        dark: 2
    }
};

export const getDamage = (attacker: Pokemon, target: Pokemon, move: FullMove) => {
    if (!move.power) return 0;

    let dmg = 0.05
    dmg += (move.power/15)*0.1

    dmg *= typeFactorMap[move.type.name]?.[target.types[0].type.name] || 1

    let levelDiff = attacker.level - target.level
    dmg += (levelDiff/10)*0.1

    return dmg
}

type PokemonBattleTurn = {
    events: {
        message: string
    }[]
}

type BattleStat = {
    acc: number,
    att: number,
    def: number
}

export const doSimplePokemonBattle = async (p1: Pokemon, p2: Pokemon) => {

    const stats: Record<string, BattleStat> = {
        p1: {
            acc: 1,
            att: p1.attack,
            def: p1.defense
        },
        p2: {
            acc: 1,
            att: p2.attack,
            def: p2.defense
        }
    }
}

const pokemonBattleTurn = (attacker: Pokemon, target: Pokemon) => {

}

