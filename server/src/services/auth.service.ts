import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ConflictError, NotFoundError, UnauthorizedError } from "../errors/httpErrors";
import { UserModel } from "../models/user/user.schema";
import { CheckDTO, LoginDTO, RegisterDTO } from "../types/dto/auth.dto";
import { JWT_SECRET } from "../config/env.config";
import { validateData } from "../utils/validations";
import { validateUserUniqueness } from "../utils/db.utils";

export const createNewUser = async (userData: RegisterDTO) => {

    validateData(userData, ['username', 'email', 'password'])

    const { username, email, password } = userData

    const { available, message } = await validateUserUniqueness(username, email)

    if (!available) {
        throw new ConflictError(message)
    }

    const newUser = await UserModel.create({
        username,
        email,
        password,
    })
    const { password: _, ...userResponse } = newUser.toObject()
    
    return userResponse
}

export const userLogin = async (credentials: LoginDTO) => {

    validateData(credentials, ['username', 'password'])

    const { username, password} = credentials
    const user = await UserModel.findOne({username}).select('+password').lean()
    
    if (!user) {
        throw new UnauthorizedError('Somtehing went wrong, please try again')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
        throw new UnauthorizedError('Somtehing went wrong, please try again')
    }
    
    const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '10m'}
    )
    
    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    }
}

export const checkUserUniqueness = async (data: CheckDTO) => {
    const { username, email } = data
    const result = await validateUserUniqueness(username, email)
    return result
}

export const getUserById = async (userId: string) => {
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new NotFoundError('User not found')
    }

    return user
}