export interface AuthDto {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string
}