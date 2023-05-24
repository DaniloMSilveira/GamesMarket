export interface UserCredentials{
    userName: string;
    password: string;
}

export interface AuthenticationResponse{
    token: string;
    expiration: Date;
}

export type UserCreateDTO = {
    name: string;
    userName: string;
    email: string;
    password: string;
}

export interface UserReadDTO{
    id: string;
    name: string;
    userName: string;
    email: string;
}