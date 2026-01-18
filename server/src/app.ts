import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.router'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

export const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)

app.use(notFoundHandler)
app.use(errorHandler)