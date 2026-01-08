import { Document } from "mongoose";
import IUser from "./user.interface";

export default interface UserDocument extends IUser, Document {
    password: string,
}