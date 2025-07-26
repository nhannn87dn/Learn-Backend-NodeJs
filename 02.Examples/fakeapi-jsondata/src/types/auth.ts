export interface ILogin {
    email: string;
    password: string;
}



export interface IProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    role: string;
    permissions: string[];
}