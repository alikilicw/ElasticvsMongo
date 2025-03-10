import { config } from 'dotenv'
config()

export type TConstants = {
    DB_URL: string
    ELASTIC_URL: string
}

export const Constants: TConstants = {
    DB_URL: process.env.DB_URL as string,
    ELASTIC_URL: process.env.ELASTIC_URL as string
}
