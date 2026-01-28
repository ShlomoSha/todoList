import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/auth.router'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import taskRouter from './routes/task.router'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'server is running'
    })
})
app.use('/auth', authRouter)
app.use('/tasks', taskRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app