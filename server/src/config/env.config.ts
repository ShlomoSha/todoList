import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3524
export const DB_URL = process.env.DB_URL as string
export const NODE_ENV = process.env.NODE_ENV as string
export const isProd = NODE_ENV === "production"

if (!DB_URL) throw new Error('DB_URL required !')