import { Document } from 'mongoose';

// Interface for the Staff entity
export interface IStaffEntity extends Document {
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  roles: string[];
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Virtual field
  fullName: string;
}

export interface IStaff extends IStaffEntity{
   _id: string;
  id: string;
}