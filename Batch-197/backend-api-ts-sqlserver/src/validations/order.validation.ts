import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');
const address = z.object({ firstName: z.string().trim().min(1).max(100), lastName: z.string().trim().min(1).max(100), phone: z.string().trim().min(1).max(20), street: z.string().trim().min(1).max(255), city: z.string().trim().min(1).max(100), state: z.string().trim().min(1).max(100) });
const customer = z.object({ firstName: z.string().trim().min(1).max(100), lastName: z.string().trim().min(1).max(100), email: z.string().trim().email().max(255), phone: z.string().trim().min(1).max(20), street: z.string().trim().min(1).max(255), city: z.string().trim().min(1).max(100), state: z.string().trim().min(1).max(100) });
const items = z.array(z.object({ productId: objectId, product_name: z.string().trim().min(1), price: z.number().min(0), quantity: z.number().int().positive(), subtotal: z.number().min(0) })).min(1);
const getAllOrders = z.object({ query: z.object({ page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().positive().default(10), status: z.enum(['pending', 'confirmed', 'shipping', 'completed', 'cancelled']).optional(), paymentStatus: z.enum(['pending', 'paid', 'failed']).optional(), customerId: objectId.optional(), sortBy: z.string().trim().optional(), sortType: z.enum(['asc', 'desc']).optional() }) });
const getOrderById = z.object({ params: z.object({ id: objectId }) });
const orderFields = { customerId: objectId.optional(), customer, items, shippingAddress: address, shippingFee: z.number().min(0).default(0), discount: z.number().min(0).default(0), paymentMethod: z.enum(['cod', 'bank_transfer', 'cash', 'credit_card', 'paypal']), status: z.enum(['pending', 'confirmed', 'shipping', 'completed', 'cancelled']).optional(), paymentStatus: z.enum(['pending', 'paid', 'failed']).optional() };
const createOrder = z.object({ body: z.object(orderFields).refine((data) => data.customerId || data.customer, { message: 'customerId or customer information is required', path: ['customerId'] }) });
const updateOrder = z.object({ body: z.object(orderFields).partial().refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' }) });
const deleteOrderById = z.object({ params: z.object({ id: objectId }) });
export default { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrderById };