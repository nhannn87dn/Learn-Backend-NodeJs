import { z } from 'zod';

const staffIdRegex = /^[0-9a-fA-F]{24}$/;

const getAllStaffs = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().default(10),
        search: z.string().trim().optional(),
        role: z.enum(['staff', 'admin']).optional(),
        sortBy: z.string().trim().optional(),
        sortType: z.enum(['asc', 'desc']).optional(),
    }),
});

const getStaffById = z.object({
    params: z.object({
        id: z.string().regex(staffIdRegex, 'Invalid staff ID format'),
    }),
});

const createStaff = z.object({
    body: z.object({
        name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
        email: z.string().trim().email('Invalid email format'),
        password: z.string().trim().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['staff', 'admin']).default('staff').optional(),
    }),
});

const updateStaff = z.object({
    body: z.object({
        name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters').optional(),
        email: z.string().trim().email('Invalid email format').optional(),
        password: z.string().trim().min(6, 'Password must be at least 6 characters').optional(),
        role: z.enum(['staff', 'admin']).optional(),
    }).refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    }),
});

const deleteStaffById = z.object({
    params: z.object({
        id: z.string().regex(staffIdRegex, 'Invalid staff ID format'),
    }),
});

export default {
    getAllStaffs,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaffById,
};