import { Document } from "mongoose";

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
    street: string;
    city: string;
    state: string;
    password: string;
}

export type CreateCustomerDto = Omit<ICustomer, keyof Document | 'createdAt' | 'updatedAt'>;
export type UpdateCustomerDto = Partial<CreateCustomerDto>;
