import fs from 'fs'

const regionNames = ['alola', 'galar',  'hoenn', 'johto', 'kalos', 'kanto', 'paldea', 'sinnoh', 'unova']

async function main() {
    const newData: any = {}

    for (const regionName of regionNames) {
        const region = JSON.parse(fs.readFileSync(`backend/cache/regions/${regionName}.json`, 'utf-8'))
        for (const location of region.locations) {
            location.id = location.areas.id
            location.region = location.areas.region

            let avgLvlSum = 0
            location.areas = location.areas.areas.filter((area: any) => {
                avgLvlSum += area.avgLvl
                return area.encounterWheel.length > 0
            })
            location.avgLvl = Math.round(avgLvlSum / location.areas.length)
        }

        region.locations = region.locations.filter((loc: any) => {
            return loc.areas.length > 0
        })
        newData[regionName] = region
    }

    fs.writeFileSync(`backend/cache/encounters.json`, JSON.stringify(newData, null, 2))
}

main()