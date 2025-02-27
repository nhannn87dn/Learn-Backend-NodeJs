export interface ICategoryCreate {
    category_name: string;
    description: string;
}

export interface IStaffEntity {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active: boolean,
  }

export interface TStaff  {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
  }