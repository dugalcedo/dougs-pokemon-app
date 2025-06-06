import dotenv from 'dotenv'
dotenv.config()

const readEnvVar = (key: string): string => {
    const value = process.env[key]
    if (value === undefined) throw new Error(`Missing environment variable: "${key}"`)
    return value
}

export default {
    PORT: readEnvVar('PORT'), 
    JWT_SECRET: readEnvVar('JWT_SECRET'),
    DEV: readEnvVar('DEV') === "true",
    THIS_ROOT: readEnvVar('THIS_ROOT')
}