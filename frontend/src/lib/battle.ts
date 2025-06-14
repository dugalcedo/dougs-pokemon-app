import { typeFactorMap, type Move, type UniquePokemon } from "./poketypes.js"

export const attack = (attacker: UniquePokemon, target: UniquePokemon, attack?: Move): string[] => {
    // if no attack, pick one at random
    attack = attacker.knownMoves[Math.floor(Math.random()*attacker.knownMoves.length)]

    const messages: string[] = []

    messages.push(`${attacker.name} used ${attack.name}!`)

    let power = attack.power || 10

    if (power) {

        // calculate type multiplier
        let typeMultiplier1 = typeFactorMap[attack.type]?.[target.types[0]] || 1
        let typeMultiplier2 = typeFactorMap[attack.type]?.[target.types[1]] || 1
        let typeMultiplier = (typeMultiplier1 + typeMultiplier2) / 2;

        // type multiplier message
        if (typeMultiplier >= 1.5) {
            messages.push("It's super effective!")
        } else if (typeMultiplier <= 0.5) {
            messages.push("It's not very effective.")
        }

        // activate type multiplier
        power *= typeMultiplier

    } // end if power

    if (attack.effects.length) {
        messages.push("[Status changes not yet implemeneted]")
    } // end if attack.effects.length

    // calculate damage as number between 0 and 1 (1 completely kills the target, 0 does nothing)
    // first, the damage should start as 0.05 and increase by ___ for every 10 power points above 10
    let damage = 0.05
    damage += ((power-10)/10) * 0.05

    // then, the damage should be decreased if the attacker's level is lower than the target's
    // or increased if the attacker's level is higher than the target's
    let levelDiffMultiplier = 1
    // 0.05 should be added to this multiplier for every difference in level
    levelDiffMultiplier += (attacker.level - target.level) * 0.05

    // console.log({levelDiffMultiplier, attLvl: attacker.level, tarLvl: target.level})

    // activate levelDiffMultiplier
    damage *= levelDiffMultiplier

    // update target HP
    target.hp -= damage

    return messages
}