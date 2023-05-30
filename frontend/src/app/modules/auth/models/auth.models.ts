export interface UserCredentials{
    userName: string;
    password: string;
}

export interface AuthenticationResponse{
    token: string;
    expiration: Date;
}

export type RegisterDto = {
    name: string;
    userName: string;
    email: string;
    password: string;
}