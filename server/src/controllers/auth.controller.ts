import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { createNewUser, userLogin } from "../services/auth.service"
import { forgotPassword, resetPassword } from "../services/password.serviece"

export const register = asyncHandler(async (req: Request, res: Response) => {
    const newUser = await createNewUser(req.body)
    res.status(201).json({
        success: true,
        message: 'User register successfully',
        data: { user: newUser }
    })
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const loginData = await userLogin(req.body)
    res.status(201).json({
        success: true,
        message: 'User logged in successfully',
        data: { loginData }
    })
})

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: { user: req.user}
    })
})

export const requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
    await forgotPassword(req.body.email)
    res.json({ message: 'If this email exists, a reset link was sent' })
})

export const resetUserPassword = asyncHandler(async (req: Request, res: Response) => {
    await resetPassword(req.body)
    res.json({ message: 'Password updated successfully' })
})