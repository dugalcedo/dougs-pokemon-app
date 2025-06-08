import fs from 'fs'

const log = (tabAmt: number, ...args: any[]) => console.log(" ".repeat(tabAmt), ...args);
const wait = (tabAmt: number, ms: number = 150) => new Promise((res) => {
    log(tabAmt, `Waiting ${ms} ms...`)
    setTimeout(res, ms)
})

main()


async function main() {
    // const r = await scrapeRegion('kanto')
    // fs.writeFileSync('backend/cache/test.json', JSON.stringify(r, null, 2))
    const res = await fetch(`https://pokeapi.co/api/v2/region`)
    const regions = (await res.json()).results

    for (const region of regions) {
        if (['kanto', 'johto', 'hoenn', 'sinnoh'].includes(region.name)) continue;
        const r = await scrapeRegion(region.name)
        fs.writeFileSync(`backend/cache/regions/${region.name}.json`, JSON.stringify(r, null, 2))
    }
}

async function scrapeRegion(id: number | string, tabAmt = 0) {
    log(tabAmt, `Scraping region: ${id}`)

    const res = await fetch(`https://pokeapi.co/api/v2/region/${id}`)
    const data = await res.json()

    const region: any = {
        name: data.name,
        locations: []
    }

    for (let i = 0; i < data.locations.length; i++) {
        const _location = data.locations[i]
        const location = {
            name: _location.name,
            id: _location.id,
            areas: await scrapeLocation(_location.name, tabAmt+2)
        }
        region.locations.push(location)
    }

    await wait(tabAmt)

    return region
}

async function scrapeLocation(id: number, tabAmt = 0) {
    log(tabAmt, `Scraping location: ${id}`)

    const res = await fetch(`https://pokeapi.co/api/v2/location/${id}`)
    const data = await res.json()

    const location: any = {
        name: data.name,
        id: data.id,
        region: data.region,
        areas: [],
        minLvl: Infinity,
        maxLvl: -Infinity
    }

    for (let i = 0; i < data.areas.length; i++) {
        const _area = data.areas[i]

        const area: any = {
            name: _area.name,
            encounterWheel: await getEncounterWheelFromLocationAreaId(_area.name, tabAmt+2)
        }

        // average level
        let levelSum = 0

        area.encounterWheel.forEach((enc: any) => {
            levelSum += (enc.minLvl + enc.maxLvl) / 2
            if (enc.minLvl < location.minLvl) location.minLvl = enc.minLvl;
            if (enc.maxLvl > location.maxLvl) location.maxLvl = enc.maxLvl;
        })

        area.avgLvl = levelSum/area.encounterWheel.length
        location.areas.push(area)
    }

    await wait(tabAmt)
    return location
}

async function getEncounterWheelFromLocationAreaId(id: number, tabAmt = 0) {
    log(tabAmt, `Getting encounter wheel for ${id}`)

    const res = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`)
    const data = await res.json()

    let encounterWheelFloor = 0
    const encounterWheel: any[] = []

    // Get wheel slices
    data.pokemon_encounters.forEach((pe: any) => {

        // get averages
        let [sumChance, sumMinLvl, sumMaxLvl] = [0, 0, 0]
        let encounterCount = 0
        pe.version_details.forEach((vd: any) => {
            vd.encounter_details.forEach((ed: any) => {
                sumChance += ed.chance
                sumMinLvl += ed.min_level
                sumMaxLvl += ed.max_level
                encounterCount++
            })
        })
        const avgChance = sumChance / encounterCount
        const avgMinLvl = sumMinLvl / encounterCount
        const avgMaxLvl = sumMaxLvl / encounterCount

        encounterWheel.push({
            pokemon: pe.pokemon.name,
            minLvl: Math.floor(avgMinLvl),
            maxLvl: Math.ceil(avgMaxLvl),
            chanceFloor: encounterWheelFloor,
            chanceCeil: encounterWheelFloor + avgChance
        })

        encounterWheelFloor += avgChance
    })

    // Calculate chances
    const overallChanceCeil = encounterWheelFloor
    encounterWheel.forEach((enc: any) => {
        enc.chance = (enc.chanceCeil - enc.chanceFloor) / overallChanceCeil
    })

    await wait(tabAmt)
    return encounterWheel
}

