export type PokemonAbility = {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

export type PokemonForm = {
    name: string,
    url: string
}

export type PokemonGameIndex = {
    game_index: number,
    version: {
        name: string,
        url: string
    }
}

export type PokemonMove = {
    move: {
        name: string
        url: string
    },
    version_group_details: {
        level_learned_at: number,
        move_learn_method: {
            name: string,
            url: string
        },
        order: null | number,
        version_group: {
            name: string,
            url: string
        }
    }[]
}

export type PokemonSprites = {
    back_default: string,
    front_default: string
}

export type PokemonStat = {
    base_stat: number,
    effor: number,
    stat: {
        name: string,
        url: string
    }
}

export type PokemonTypeName = (
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy'
)

export const PokemonTypeNameColorMap: Record<PokemonTypeName, string> = {
    normal: '#AAAA99',
    fire: '#FF4422',
    water: '#3388FF',
    electric: '#FFCC33',
    grass: '#77CC55',
    ice: '#66CCFF',
    fighting: '#BB5544',
    poison: '#AA5599',
    ground: '#DDBB55',
    flying: '#8899FF',
    psychic: '#FF5599',
    bug: '#AABB22',
    rock: '#BBAA66',
    ghost: '#6666BB',
    dragon: '#7766EE',
    dark: '#775544',
    steel: '#AAAABB',
    fairy: '#EE99EE'
}

export const pokemonTypeToColor = (s: string): string => {
    return PokemonTypeNameColorMap[s as PokemonTypeName] || 'white'
}

export type PokemonType = {
    slot: number,
    type: {
        name: PokemonTypeName,
        url: string
    }
}

export type Pokemon = {
    abilities: PokemonAbility[],
    base_experience: number,
    cries: {
        latest: string,
        legacy: string
    },
    forms: PokemonForm[],
    height: number,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: PokemonMove[],
    name: string,
    order: number,
    species: {
        name: string,
        url: string
    },
    sprites: PokemonSprites,
    stats: PokemonStat[],
    types: PokemonType[],
    weight: number
}

export type PlayerPokemon = Pokemon & {
    pokemonId: number,
    playerId: number,
    level: number,
    exp: number,
    hp: number,
    moves: string[]
}

export type Encounter = {
    pokemon: string,
    minLvl: number,
    maxLvl: number,
    chanceFloor: number,
    chanceCeil: number,
    chance: number
}

export type RegionEncounters = {
    name: string,
    locations: {
        name: string,
        id: number,
        region: { name: string, url: string },
        avgLvl: number,
        areas: {
            name: string,
            avgLvl: number,
            encounterWheel: Encounter[]
        }[]
    }[]
}