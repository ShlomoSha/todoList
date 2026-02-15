import { ConflictError } from "../errors/httpErrors"
import { UserModel } from "../models/user/user.schema"

export const validateUserUniqueness = async (username?: string, email?: string) => {
    const conditions = []

    if (username) conditions.push({username})
    if (email) conditions.push({email})

    if (conditions.length === 0) return

    const existUser = await UserModel.findOne({ $or: conditions })

    if (!existUser) return

    const field = existUser.username === username ? 'username' : 'email'
    throw new ConflictError(`User with this ${field} already exist`)
}