import { FRONTEND_URL } from "../config/env.config"
import { BadRequestError } from "../errors/httpErrors"
import { UserModel } from "../models/user/user.schema"
import crypto from "crypto"
import { sendResetEmail } from "../utils/email.utils"
import { ResetPasswordDTO } from "../types/dto/auth.dto"
import { validateData } from "../utils/validations"

export const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')

export const forgotPassword = async (email: string) => {
    if (!email) throw new BadRequestError('Something is missing')
    
    const user = await UserModel.findOne({ email })
    if (!user) return

    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = hashToken(rawToken)

    user.passwordRestToken = hashedToken
    user.passwordRestExpires = new Date(Date.now() + 60 * 60 * 1000)
    await user.save()

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`
    await sendResetEmail(user.email, resetUrl)
}

export const resetPassword = async (data: ResetPasswordDTO) => {
    validateData(data, ["rawToken", "newPassword"])

    const { rawToken, newPassword } = data

    const hashedToken = hashToken(rawToken)

    const user = await UserModel.findOne({
        passwordRestToken: hashedToken,
        passwordRestExpires: { $gt: new Date() },
    }).select('+password +passwordRestToken +passwordRestExpires')

    if (!user) throw new BadRequestError('Token is invalid or has expired')

    user.password = newPassword
    user.passwordRestToken = undefined
    user.passwordRestExpires = undefined
    await user.save()
}