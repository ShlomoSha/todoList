import { connect } from "mongoose"

export const connectToDb = async (path: string) => {
    try {
        await connect(path)
        console.log('[mongodb] connected to db')
    } catch (err) {
        console.log(err)
    }
}