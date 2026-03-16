import { IUser } from "./user.type";


export interface ITask {
    title: string;
    description?: string; //optional
    isCompleted: boolean;
    user: IUser;
}

export type TTaskPayload = {
    title: string;
    completed: boolean;
    description?: string;
    user: IUser;
}