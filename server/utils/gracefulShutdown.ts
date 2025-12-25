import { closeDb } from "../src/config/db.config"
import { isProd } from "../src/config/env.config";

const SHUTDOWN_TIMEOUT = isProd ? 25000 : 5000;

let isShuttingDown = false

export const gracefulShutdown = async (signal: string, err: Error | null, server?: any) => {
    if (isShuttingDown) return
    isShuttingDown = true
    if (err) {
        console.error(`💥${signal} ! Shutting down...`)
        if (!isProd) {
            console.error('Reason:', err.name, err.message);
            console.error('Stack:', err.stack);
        } else {
            console.error('Reason:', err.name);
        }
    } else {
        console.log(`[Server] ${signal} received, shutting down gracefully...`)
    }
    try {
        const forceExitTimeout =  setTimeout(() => {
            console.error('[Server] Forcing shutdown after timeout')
            process.exit(1)
        }, SHUTDOWN_TIMEOUT)

        forceExitTimeout.unref()
        if (server) {
            await new Promise<void> ((resolve, reject) => {
                server.close((e: Error) => (e ? reject(e) : resolve()))
            })
            console.log(`[Server] http server closed`)
        }
        await closeDb()
        clearTimeout(forceExitTimeout)
        process.exit(0)

    } catch (err) {
        console.error('[Server] Error during shutdown:', err)
        process.exit(1)
    }
}