import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDb } from '../config/connectdb'

export const app = express()

dotenv.config()

const PORT = process.env.PORT || 3542
const DB_URL = process.env.DB_URL as string

connectToDb(DB_URL)

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`) 
})