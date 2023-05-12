export interface UserCredentials{
    userName: string;
    password: string;
}

export type UserCreateDTO = {
    name: string;
    email: string;
    userName: string;
    password: string;
}

export interface authenticationResponse{
    token: string;
    expiration: Date;
}

export interface userDTO{
    id: string;
    email: string;
}