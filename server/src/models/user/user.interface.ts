import { Schema } from "mongoose"

export default interface IUser extends Document {
    _id?: Schema.Types.ObjectId,
    username: string,
    password: string
}