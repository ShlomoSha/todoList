import { model, Schema } from "mongoose";
import UserDocument from "./user.model";

export const UserSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            required: [true, "username is required!"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required!"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "password is required!"],
            minLength: [6, "password must be at least 6 characters"],
            select: false,
        },
        passwordRestToken: {
            type: String,
            select: false,
        },
        passwordRestExpires: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const UserModel = model<UserDocument>("Users", UserSchema)