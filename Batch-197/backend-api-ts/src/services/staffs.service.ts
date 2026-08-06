import createError from 'http-errors';
import Staff from '../models/staff.model';
import { CreateStaffDto, UpdateStaffDto } from '../types/staff';
import { hashPassword } from '../helpers/password.helper';

type QueryParams = {
    limit?: number | string;
    page?: number | string;
    search?: string;
    role?: 'staff' | 'admin';
    sortBy?: string;
    sortType?: 'asc' | 'desc';
};

const sanitizeStaff = (staff: any) => {
    const staffObject = staff.toObject ? staff.toObject() : staff;
    delete staffObject.password;
    delete staffObject.__v;
    return staffObject;
};

// Get all staffs
const findAll = async (query: QueryParams = {}) => {
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    const sortType = query.sortType === 'asc' ? 'asc' : 'desc';
    const sortBy = typeof query.sortBy === 'string' && query.sortBy.trim() !== '' ? query.sortBy : 'createdAt';

    let filter = {};

    if (search !== '') {
        filter = {
            ...filter,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        };
    }

    if (query.role) {
        filter = { ...filter, role: query.role };
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortType === 'asc' ? 1 : -1;

    const staffs = await Staff.find({
        ...filter,
    })
        .select('-password -__v')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({
            ...sortOptions,
        });

    const total = await Staff.countDocuments({
        ...filter,
    });

    return {
        records: staffs,
        metadata: {
            limit,
            page,
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

// Get staff by id
const findById = async (id: string) => {
    const staff = await Staff.findById(id).select('-password -__v');

    if (!staff) {
        throw createError(400, `Staff with id ${id} not found`);
    }

    return staff;
};

// Create staff
const create = async (createStaffDto: CreateStaffDto) => {

    //hash password before saving
    const hashedPassword = await hashPassword(createStaffDto.password);

    const staff = new Staff({
        name: createStaffDto.name,
        email: createStaffDto.email,
        password: hashedPassword,
        role: createStaffDto.role || 'staff',
    });

    await staff.save();
    return sanitizeStaff(staff);
};

// Update staff
const updateById = async (id: string, updateStaffDto: UpdateStaffDto) => {
    const staff = await Staff.findById(id);

    if (!staff) {
        throw createError(400, `Staff with id ${id} not found`);
    }

    //Nếu cập nhật password thì hash password trước khi lưu
    if (updateStaffDto.password) {
        updateStaffDto.password = await hashPassword(updateStaffDto.password);
    }

    Object.assign(staff, updateStaffDto);

    await staff.save();
    return sanitizeStaff(staff);
};

// Delete staff
const deleteById = async (id: string) => {
    const staff = await Staff.findById(id).select('-password -__v');

    if (!staff) {
        throw createError(400, `Staff with id ${id} not found`);
    }

    await Staff.deleteOne({ _id: id });
    return staff;
};

const verifyUserByEmail = async (email: string) => {
    const staff = await Staff.findOne({ email: email.toLowerCase() });
    return staff;
}

const verifyUserById = async (id: string) => {
    const staff = await Staff.findById(id);
    return staff;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    verifyUserByEmail,
    verifyUserById,
};