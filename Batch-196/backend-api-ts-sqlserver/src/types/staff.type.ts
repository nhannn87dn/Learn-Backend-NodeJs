export interface StaffDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  role: 'admin' | 'staff';
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffDto {
  name: string;
  email: string;
  password: string;
  is_active?: boolean;
  role?: 'admin' | 'staff';
}

export interface UpdateStaffDto {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  role?: 'admin' | 'staff';
}
