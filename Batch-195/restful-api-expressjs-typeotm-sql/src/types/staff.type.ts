export interface IStaffDTO {
  fullName: string;
  email: string;
  active?: boolean;
  password: string;
  role?: 'admin' | 'manager' | 'staff';
}
