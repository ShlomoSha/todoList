import { UserModel } from "../models/user/user.schema"

export const validateUserUniqueness = async (username?: string, email?: string): Promise<{ available: boolean; message: string; }> => {
    const conditions = []

    if (username) conditions.push({username})
    if (email) conditions.push({email})

    const existUser = await UserModel.findOne({ $or: conditions })

    if (!existUser) return { available: true, message: 'There is no user with this details' }

    const field = existUser.username === username ? 'username' : 'email'
    return { available: false, message: `User with this ${field} already exist` }
}