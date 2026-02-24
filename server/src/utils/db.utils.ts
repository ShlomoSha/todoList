import { UserModel } from "../models/user/user.schema"

export const validateUserUniqueness = async (username?: string, email?: string, excludeUserId?: string): Promise<{ available: boolean; message: string; }> => {
    const conditions = []

    if (username) conditions.push({username})
    if (email) conditions.push({email})

    if (conditions.length === 0) return { available: true, message: 'No fields to check' }

    const query: any = { $or: conditions }
    
    if (excludeUserId) {
        query._id = { $ne: excludeUserId }
    }

    const existUser = await UserModel.findOne(query)

    if (!existUser) return { available: true, message: 'There is no user with this details' }

    const field = existUser.username === username ? 'username' : 'email'
    return { available: false, message: `User with this ${field} already exist` }
}