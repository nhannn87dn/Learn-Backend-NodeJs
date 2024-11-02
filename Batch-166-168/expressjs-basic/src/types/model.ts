import { Model } from "mongoose";

export interface IStaff{
    _id?: string,
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    password: string,
    role?: 'admin' | 'user' | 'root',
    active?: boolean,
}

// Put all user instance methods in this interface:
export interface IStaffMethods {
    comparePassword(n: string): boolean;
  }

// Create a new Model type that knows about IUserMethods...
export type StaffModel = Model<IStaff, {}, IStaffMethods>;