import { Model, DataTypes as DT } from "sequelize"
import { sequelize } from "../db/sequelize.ts"
import { fetchPokeAPIDTO, fetchMove, type UniquePokemon } from '../../poketypes.ts'

class PlayerPokemonModel extends Model {
    async toUniquePokemon(): Promise<UniquePokemon> {
        const dto = await fetchPokeAPIDTO(this.dataValues.pokemonId)
        const knownMoves = await Promise.all(this.dataValues.moveNames.split(',').map((mn: string) => fetchMove(mn)))
        return {
            ...dto,
            level: this.dataValues.level,
            hp: this.dataValues.hp,
            exp: this.dataValues.exp,
            knownMoves
        }
    }
}

PlayerPokemonModel.init({
    ppId: {
        primaryKey: true,
        type: DT.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    pokemonId: {
        primaryKey: false,
        type: DT.INTEGER,
        autoIncrement: false,
        unique: false,
        allowNull: false
    },
    playerId: {
        primaryKey: false,
        type: DT.INTEGER,
        autoIncrement: false,
        unique: false,
        allowNull: false
    },
    moveNames: {
        type: DT.STRING, // e.g. "headbutt,take-down,yawn"
        allowNull: false
    },
    level: {
        type: DT.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        }
    },
    hp: {
        type: DT.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
            max: 1
        }
    },
    exp: {
        type: DT.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 1
        }
    },
}, {
    sequelize,
    modelName: 'PlayerPokemon',
    tableName: 'PlayerPokemon'
})

export default PlayerPokemonModel