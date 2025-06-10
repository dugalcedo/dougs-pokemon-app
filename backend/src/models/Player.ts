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
                hasStarted: data.hasStarted
            }, { transaction })


            await transaction.commit()
            return {
                status: 201,
                message: "Player updated"
            }

        } catch (error) {
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