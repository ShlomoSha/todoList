import IUser from "../../models/user/user.interface";

export interface LoginDTO extends IUser {
    password: string
}

export interface RegisterDTO extends LoginDTO {}