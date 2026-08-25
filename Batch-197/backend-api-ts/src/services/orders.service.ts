import createError from 'http-errors';
import Order from '../models/order.model';
import Customer from '../models/customer.model';
import { CreateOrderDto, CustomerCheckoutInfo, UpdateOrderDto } from '../types/order';

type QueryParams = { limit?: number | string; page?: number | string; status?: string; paymentStatus?: string; customerId?: string; sortBy?: string; sortType?: 'asc' | 'desc' };

const calculateTotals = (data: { items?: { price: number; quantity: number }[]; shippingFee?: number; discount?: number }) => {
    const subtotal = data.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    return { subtotal, total: Math.max(0, subtotal + (data.shippingFee || 0) - (data.discount || 0)) };
};

const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const filter: Record<string, string> = {};
    if (query.status) filter.status = query.status;
    if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;
    if (query.customerId) filter.customerId = query.customerId;
    const sort = { [query.sortBy?.trim() || 'createdAt']: query.sortType === 'asc' ? 1 : -1 } as Record<string, 1 | -1>;
    const [records, totalRecords] = await Promise.all([
        Order.find(filter).populate('customerId', '-password').limit(limit).skip((page - 1) * limit).sort(sort),
        Order.countDocuments(filter),
    ]);
    return { records, metadata: { limit, page, totalRecords, totalPages: Math.ceil(totalRecords / limit) } };
};

const findById = async (id: string) => {
    const order = await Order.findById(id).populate('customerId', '-password');
    if (!order) throw createError(400, `Order with id ${id} not found`);
    return order;
};

const resolveCustomerId = async (customerId: CreateOrderDto['customerId'], customer?: CustomerCheckoutInfo) => {
    if (customerId) {
        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) throw createError(400, `Customer with id ${customerId} not found`);
        return existingCustomer._id;
    }

    if (!customer) throw createError(400, 'Customer information is required');

    const email = customer.email.toLowerCase();
    const existingCustomer = await Customer.findOne({ $or: [{ email }, { phone: customer.phone }] });
    if (existingCustomer) return existingCustomer._id;

    const newCustomer = await Customer.create({ ...customer, email });
    return newCustomer._id;
};

const create = async (dto: CreateOrderDto) => {
    const { customer, customerId, ...orderData } = dto;
    const resolvedCustomerId = await resolveCustomerId(customerId, customer);
    const order = new Order({ ...orderData, customerId: resolvedCustomerId, ...calculateTotals(dto), items: dto.items.map((item) => ({ ...item, subtotal: item.price * item.quantity })) });
    await order.save();
    return order;
};

const updateById = async (id: string, dto: UpdateOrderDto) => {
    const order = await Order.findById(id);
    if (!order) throw createError(400, `Order with id ${id} not found`);
    Object.assign(order, dto, calculateTotals({ ...order.toObject(), ...dto }));
    if (dto.items) order.items = dto.items.map((item) => ({ ...item, subtotal: item.price * item.quantity }));
    await order.save();
    return order;
};

const deleteById = async (id: string) => {
    const order = await findById(id);
    await Order.deleteOne({ _id: id });
    return order;
};

export default { findAll, findById, create, updateById, deleteById };