import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ConflictError, NotFoundError, UnauthorizedError } from "../errors/httpErrors";
import { UserModel } from "../models/user/user.schema";
import { LoginDTO, RegisterDTO } from "../types/dto/auth.dto";
import { JWT_SECRET } from "../config/env.config";
import { validateData } from "../utils/validiation";

export const createNewUser = async (userData: RegisterDTO) => {

    validateData(userData, ['username', 'password'])

    const { username, password } = userData
    const existUser = await UserModel.findOne({ username })

    if (existUser) {
        throw new ConflictError('User with this username already exist')
    }

    const hashPass = await bcrypt.hash(password, 12)
    const newUser = await UserModel.create({
        username,
        password: hashPass
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
            username: user.username
        }
    }
}

export const getUserById = async (userId: string) => {
    const user = await UserModel.findById(userId)

    if (!user) {
        throw new NotFoundError('User not found')
    }

    return user
}