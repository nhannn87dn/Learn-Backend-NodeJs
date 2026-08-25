import { z } from 'zod';

const customerId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid customer ID format');
const getAllCustomers = z.object({ query: z.object({ page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().positive().default(10), search: z.string().trim().optional(), sortBy: z.string().trim().optional(), sortType: z.enum(['asc', 'desc']).optional() }) });
const getCustomerById = z.object({ params: z.object({ id: customerId }) });
const fields = { firstName: z.string().trim().min(1).max(100), lastName: z.string().trim().min(1).max(100), email: z.string().trim().email().max(255), phone: z.string().trim().min(1).max(20), street: z.string().trim().min(1).max(255), city: z.string().trim().min(1).max(100), state: z.string().trim().min(1).max(100), password: z.string().trim().min(6).max(255) };
const createCustomer = z.object({ body: z.object(fields) });
const updateCustomer = z.object({ body: z.object(fields).partial().refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' }) });
const deleteCustomerById = z.object({ params: z.object({ id: customerId }) });
export default { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomerById };