import {ObjectId, Date, Model , HydratedDocument} from 'mongoose';


export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

//---------------Employees-----------------------//
export interface IEmployee  extends IUser{
  address: string;
  birthDay: Date;
  photo: string;
}

//https://mongoosejs.com/docs/typescript/statics-and-methods.html

// Put all  instance methods in this interface:
export  interface IEmployeeMethods {
  comparePassword: (s : string)=> boolean;
}

//put all static method in this interface:
export interface EmployeeModel extends Model<IEmployee, {}, IEmployeeMethods> {
  isEmailTaken: (email: string, id: string) =>  Promise<HydratedDocument<IEmployee, IEmployeeMethods>>;
}

//---------------Categories-----------------------//
export interface ICategory {
  name: string;
  description?: string;
  slug: string;
  photo: string
}


//---------------Supplier-----------------------//
export interface ISupplier {
  name: string;
  phoneNumber: string;
  email: string;
  photo: string;
  slug: string;
  address?: string;
}


export  interface SupplierModel extends Model<ISupplier> {
  isEmailTaken: (email: string, id: string) =>  Promise<boolean>
}

//---------------Customer-----------------------//
export interface ICustomer extends  IEmployee{

}


//---------------Product-----------------------//
export interface IProduct {
  name: string;
  slug: string;
  price: number;
  discount: number;
  stock: number;
  description?: string;
  category: ObjectId;
  supplierId: ObjectId;
  images?: string[];
  thumb: string;
}


//---------------Orders-----------------------//


//---------------OrderDetails-----------------------//