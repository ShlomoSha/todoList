import { app } from "./app"
import { connectToDb } from "./config/db.config"
import { DB_URL, PORT } from "./config/env.config"
import { setServerInstance, setUpProcessHandlers } from "../utils/processHandlers"

const startServer = async (): Promise<void> => {
    try {
        await connectToDb(DB_URL)

        const server = app.listen(PORT, () => {
            console.log(`[Server] server running on http://localhost:${PORT}`)
        });
        
        setServerInstance(server)
        
    } catch (err) {
        console.error('[Server] faild to start' ,err)
        process.exit(1)
    }
}

setUpProcessHandlers()

startServer()