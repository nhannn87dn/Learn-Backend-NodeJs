import createError from 'http-errors';
import Customer from '../models/customer.model';
import { hashPassword } from '../helpers/password.helper';
import { CreateCustomerDto, UpdateCustomerDto } from '../types/customer';

type QueryParams = { limit?: number | string; page?: number | string; search?: string; sortBy?: string; sortType?: 'asc' | 'desc' };

const sanitize = (customer: any) => {
    const value = customer.toObject ? customer.toObject() : customer;
    delete value.password;
    return value;
};

const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    const filter = search ? { $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }] } : {};
    const sort = { [query.sortBy?.trim() || 'createdAt']: query.sortType === 'asc' ? 1 : -1 } as Record<string, 1 | -1>;
    const [records, totalRecords] = await Promise.all([
        Customer.find(filter).select('-password').limit(limit).skip((page - 1) * limit).sort(sort),
        Customer.countDocuments(filter),
    ]);
    return { records, metadata: { limit, page, totalRecords, totalPages: Math.ceil(totalRecords / limit) } };
};

const findById = async (id: string) => {
    const customer = await Customer.findById(id).select('-password');
    if (!customer) throw createError(400, `Customer with id ${id} not found`);
    return customer;
};

const create = async (dto: CreateCustomerDto) => {
    const customer = new Customer({ ...dto, password: dto.password ? await hashPassword(dto.password) : undefined });
    await customer.save();
    return sanitize(customer);
};

const updateById = async (id: string, dto: UpdateCustomerDto) => {
    const customer = await Customer.findById(id);
    if (!customer) throw createError(400, `Customer with id ${id} not found`);
    if (dto.password) dto.password = await hashPassword(dto.password);
    Object.assign(customer, dto);
    await customer.save();
    return sanitize(customer);
};

const deleteById = async (id: string) => {
    const customer = await findById(id);
    await Customer.deleteOne({ _id: id });
    return customer;
};

export default { findAll, findById, create, updateById, deleteById };