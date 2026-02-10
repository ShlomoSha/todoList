import { gracefulShutdown } from "./gracefulShutdown"
import { Server } from 'http'

let serverInstance: Server | undefined

export const setServerInstance = (server: Server): void => {
    serverInstance = server
}

export const setUpProcessHandlers = (): void => {
    // process.on('SIGTERM', async () => await gracefulShutdown('SIGTERM', null, serverInstance))
    // process.on('SIGINT', async () => await gracefulShutdown('SIGINT', null, serverInstance))

    process.on('uncaughtException', async (err: Error) => {
        console.error('Unhandled Exception:', err)
        // await gracefulShutdown('uncaughtException', err, serverInstance)
    })

    process.on('unhandledRejection', async (err: Error) => {
        console.error('Unhandled Rejection:', err)
            // await gracefulShutdown('unhandledRejection', err, serverInstance)
        })
}