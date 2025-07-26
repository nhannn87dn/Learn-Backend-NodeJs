export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
}

export interface IUserCreate {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
}

export interface IUserUpdate {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    active?: boolean;
    role?: string;
}