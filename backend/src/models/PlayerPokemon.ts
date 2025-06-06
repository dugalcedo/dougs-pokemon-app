import { sequelize } from "../db/sequelize.ts";
import { Model, DataTypes } from "sequelize";

class PlayerPokemonModel extends Model {}

PlayerPokemonModel.init({
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    },
    exp: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            max: 1,
            min: 0
        }
    },
    hp: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            max: 1,
            min: 0
        }
    },
    moves: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
}, {
    sequelize,
    modelName: "PlayerPokemon",
    tableName: "PlayerPokemon"
})

export default PlayerPokemonModel