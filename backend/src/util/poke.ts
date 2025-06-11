import { type UniquePokemon, type Move, type PokeAPIDTO, fetchMove } from "../../poketypes.ts";

export const getRandomMoves = async (p: PokeAPIDTO, up: UniquePokemon): Promise<Move[]> => {
    const moves: Move[] = []

    // get learnable moves
    const learnableMoves = p.allMoves.filter(m => {
        const inLevel = m.level_learned <= up.level && m.level_learned > 0 
        return inLevel
    })
    shuffle(learnableMoves)

    // populate moves
    const movePool = (await Promise.all(learnableMoves.map(lm => fetchMove(lm.name))))
        // Filter out moves that only change status effect, (e.g. paralyze, poison)
        // These moves are not implemented yet
        .filter(m => {
            return (m.power && (m.power > 0)) || m.effects.length > 0
        })

    // find at least one move that has attack power
    const mainAttackIndex = movePool.findIndex(m => m.power && (m.power > 0))
    const mainAttack = movePool.splice(mainAttackIndex, 1)[0]
    if (mainAttack) moves.push(mainAttack)

    // find more random moves
    moves.push(...movePool.slice(0, 3))

    return moves
}

function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}