export interface UserCredentials {
    userName: string;
    password: string;
}

export interface AuthenticationResponse{
    accessToken: string;
    expiresIn: Date;
    userToken: UserTokenDto;
}

export type RegisterDto = {
    name: string;
    userName: string;
    email: string;
    password: string;
}

interface UserTokenDto {
    id: string;
    userName: string;
    email: string;
    claims: ClaimDto[];
}

type ClaimDto = {
    type: string;
    value: string;
}