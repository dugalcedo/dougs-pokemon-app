import type { Pokemon } from "./pokemonTypes.js"

export function playPokemonSound(p: Pokemon) {
    const audioEl = document.createElement('audio')
    audioEl.src = p.cries.latest
    audioEl.play()
}

export const randRange = (min: number, max: number) => Math.random()*(max-min)+min;


export const getPokemonMaxHp = (p: Pokemon): number => {
    const baseHp = p.stats.find(stat => stat.stat.name === 'hp')!.base_stat
    return baseHp + (p.level*3)
}

export const getPokemonStat = (p: Pokemon, name: string) => {
    const baseStat = p.stats.find(stat => stat.stat.name === name)?.base_stat || 0
    return baseStat + p.level
}

export const getIdFromURL = (url: string, key: string): number => {
    const endStr = `/${key}/`
    const endI = url.indexOf(endStr)
    return Number(url.slice(endI + endStr.length))
}

export function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}