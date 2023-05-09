export interface userCredentials{
    login: string;
    password: string;
}

export type UserCreateDTO = {
    UserName: string;
    name: string;
    email: string;
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