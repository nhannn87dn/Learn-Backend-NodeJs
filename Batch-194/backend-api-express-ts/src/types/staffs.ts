import { ObjectId } from "mongoose";

export interface IStaff {
    _id: ObjectId;
    fullName: string;
    email: string;
    active: boolean;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStaffDTO {
    fullName: string;
    email: string;
    active?: boolean;
    password: string;
    role: string;
}