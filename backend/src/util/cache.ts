import fs from 'fs'

export const getCached = (name: string): any => {
    try {
        const cached = fs.readFileSync(`cache/${name}.json`, 'utf-8')
        return JSON.parse(cached)
    } catch {}
}

export const cache = (name: string, data: any) => {
    fs.writeFileSync(`cache/${name}.json`, JSON.stringify(data))
}