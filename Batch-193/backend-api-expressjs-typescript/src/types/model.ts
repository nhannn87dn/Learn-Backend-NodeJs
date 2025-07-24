export interface IStaffEntity {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    active: boolean,
    roles: string[];
  }

export interface IStaff extends IStaffEntity{
   _id: string;
   id: string;
   createdAt: Date;
    updatedAt: Date;
}