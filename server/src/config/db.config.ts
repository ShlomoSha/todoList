import mongoose from "mongoose"

export const connectToDb = async (dbPath: string) => {
    try {
        await mongoose.connect(dbPath)
        console.log('[Mongodb] connected to db')
    } catch (err) {
        throw new Error('[Mongodb] failed connected to db\n' + err)
    }
}

export const closeDb = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close()
            console.log('[Mongodb] database connection closed')
        } else {
            console.log('[Mongodb] no active connection to close')
        }
    } catch (err) {
        throw new Error('[Mongodb] failed close mongodb connection\n' + err);        
    }
}