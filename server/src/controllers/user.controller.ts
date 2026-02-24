import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { updateUserProfile } from "../services/user.service";

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await updateUserProfile({
        ...req.body,
        userId: req.user._id
    })

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: updatedUser }
    })
})
