
export type AdminUser = {
    id: string;
    userName: string;
    email: string;
    profile?: string;
}

export type UserCreateDto = {
    name: string;
    userName: string;
    email: string;
    password: string;
}