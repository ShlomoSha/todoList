export interface LoginDTO {
    username: string;
    password: string;
}

export interface RegisterDTO extends LoginDTO {
    email: string
}

export interface CheckDTO {
    username?: string
    email?: string
    excludeUserId?: string
}

export interface ResetPasswordDTO {
    rawToken: string;
    newPassword: string;
}