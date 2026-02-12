import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3524
export const DB_URL = process.env.DB_URL as string
export const NODE_ENV = process.env.NODE_ENV as string
export const JWT_SECRET = process.env.JWT_SECRET!
export const isProd = NODE_ENV === "production"
export const RESEND_API_KEY = process.env.RESEND_API_KEY
export const FROM_EMAIL_DEV = process.env.FROM_EMAIL_DEV as string
export const FRONTEND_URL = process.env.FRONTEND_URL as string

if (!DB_URL) throw new Error('DB_URL required !')
if (!JWT_SECRET) throw new Error('JWT_SECRET required !') 