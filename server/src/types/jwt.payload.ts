import IUser from "../models/user/user.interface";

export default interface JwtPayload extends IUser {
    id: string;
}