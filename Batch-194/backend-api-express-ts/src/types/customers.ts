import { Document, ObjectId } from 'mongoose';
export interface ICustomer extends Document {
  customer_id: ObjectId;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  password?: string;
  active?: boolean;
}

export interface ICustomerDTO {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  password?: string;
    active?: boolean;
}