export interface ICategoryCreate {
    category_name: string;
    description: string;
}


export interface TStaff  {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
  }