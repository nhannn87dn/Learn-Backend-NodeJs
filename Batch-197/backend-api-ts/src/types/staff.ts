export type TStaff = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'staff' | 'admin';
};

export type CreateStaffDto = {
    name: string;
    email: string;
    password: string;
    role?: 'staff' | 'admin';
};

export type UpdateStaffDto = Partial<CreateStaffDto>;