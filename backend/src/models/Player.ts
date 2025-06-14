import { Model, DataTypes as DT } from "sequelize"
import { sequelize } from "../db/sequelize.ts"
import { tryCache } from "../util/cache.ts"
import bcrypt from "bcryptjs"

class PlayerModel extends Model {
    async sync(data: any) {
        const transaction = await sequelize.transaction()

        try {
            // update player data
            await this.update({
                hasStarted: data.hasStarted,
                region: data.region
            }, { transaction })

            // update pokemon
            const PlayerPokemon = sequelize.model('PlayerPokemon')
            // const currentlyOwnedPokemon = await PlayerPokemon.findAll({ where: { playerId: this.dataValues.id }, raw: true })

            // for (const cop of currentlyOwnedPokemon) {

            // }

            // UNSAFE UPDATE POKEMON, temporary, may add duplicates
            for (const p of data.pokemon) {
                await PlayerPokemon.create({
                    ...p,
                    id: undefined,
                    pokemonId: p.id,   
                    playerId: this.dataValues.id,
                    level: p.level || 5,
                    hp: p.hp || 1,
                    exp: p.exp || 0,
                    moveNames: 'tackle,leer'
                }, { transaction })
            }


            await transaction.commit()
            return {
                status: 201,
                message: "Player updated"
            }

        } catch (error) {
            console.log(error)
            await transaction.rollback()
            return {
                status: 500,
                message: (error as any)?.message || "Internal server error"
            }
        }
    }
}

PlayerModel.init({
    name: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 50]
        }
    },
    password: {
        type: DT.STRING,
        allowNull: false,
        validate: {
            len: [5, 100]
        }
    },
    hasStarted: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    region: {
        type: DT.STRING,
        allowNull: true
    },
    pokemon: {
        type: DT.STRING,
        allowNull: false,
        defaultValue: "[]"
    }
}, {
    sequelize,
    modelName: 'Player',
    tableName: 'Players',
    hooks: {
        async beforeCreate(player) {
            const p = player as any
            p.password = await bcrypt.hash(p.password, 7)
        }
    }
})

export default PlayerModel