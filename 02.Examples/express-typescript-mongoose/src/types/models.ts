import {ObjectId } from 'mongoose';

export interface IUser {
    _id?: ObjectId,
    name: string;
    email: string;
    password: string;
    role?: string;
    isEmailVerified?: boolean;
  }

export interface UserSchema extends IUser {
  comparePassword: (s : string)=> boolean;
}