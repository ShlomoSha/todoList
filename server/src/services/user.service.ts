import { ConflictError, NotFoundError } from "../errors/httpErrors";
import { UserModel } from "../models/user/user.schema";
import { UpdateProfileDTO } from "../types/dto/user.dto";
import { validateUserUniqueness } from "../utils/db.utils";

export const updateUserProfile = async (updateData: UpdateProfileDTO) => {
    const { userId, username, email } = updateData

    const user = await UserModel.findById(userId)
    if (!user) {
        throw new NotFoundError('User not found')
    }

    // Only validate uniqueness if field is provided and changed
    const usernameChanged = username && username !== user.username
    const emailChanged = email && email !== user.email

    if (usernameChanged || emailChanged) {
        const { available, message } = await validateUserUniqueness(
            usernameChanged ? username : undefined,
            emailChanged ? email : undefined,
            userId
        )

        if (!available) {
            throw new ConflictError(message)
        }
    }

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    const { password: _, ...userResponse } = user.toObject()
    return userResponse
}
