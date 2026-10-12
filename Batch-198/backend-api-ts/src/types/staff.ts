export type TStaff = {
    _id: string;
    name: string;
    avatar: string;
    email: string;
    isActive: boolean;
    role: "admin" | "staff";
    createdAt: Date;
    updatedAt: Date;
}

export type StaffCreateDTO = Omit<TStaff, '_id' | 'createdAt' | 'updatedAt'> & {
    password: string;
};

