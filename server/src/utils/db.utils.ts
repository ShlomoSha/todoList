import { ConflictError } from "../errors/httpErrors"
import { UserModel } from "../models/user/user.schema"

export const validateUserUniqueness = async (username: string, email: string) => {
    const existUser = await UserModel.findOne({ $or: [ {username}, {email} ] })

    if (!existUser) return

    const field = existUser.username === username ? 'username' : 'email'
    throw new ConflictError(`User with this ${field} already exist`)
}