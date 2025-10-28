import createError from 'http-errors';
import { IStaffDTO } from "../types/staffs";
import Staff from "../models/Staff.model";

const findAll = async (query: any) => {
	// Lấy tất cả staffs CÓ phân trang
	// Mặc định page=1, limit=10 nếu không có truyền vào
	const { page = 1, limit = 10 } = query || {};

	const staffs = await Staff
		.find()
		.select('-password') // loại bỏ password khi trả về
		.skip((page - 1) * limit)
		.limit(limit);

	const total = await Staff.countDocuments();
	return {
		items: staffs,
		pagination: {
			totalRecords: total,
			totalPage: Math.ceil(total / limit),
			currentPage: Number(page),
			limit: Number(limit),
		}
	};
}

const findById = async ({ id }: { id: string }) => {
	// Tìm staff theo id (ẩn password)
	const staff = await Staff.findById(id).select('-password');
	if (!staff) {
		throw createError(404, "Staff not found");
	}
	return staff;
}

const create = async (staffDto: IStaffDTO) => {
	// Tạo staff mới
	const staff = new Staff({
		fullName: staffDto.fullName,
		email: staffDto.email,
		active: staffDto.active,
		password: staffDto.password,
		role: staffDto.role,
	});

	const result = await staff.save();
	// Không trả password về phía client
	// (có thể bỏ chọn ở controller/service khi trả response)
	return result;
}

const updateById = async ({
	id,
	payload
}: {
	id: string,
	payload: Partial<IStaffDTO>
}) => {
	// step1: kiểm tra tồn tại
	let staff = await findById({ id });
	if (!staff) {
		throw createError(404, "Staff not found");
	}

	// step2: merge payload
	//Object.assign(staff, payload);
    if(payload.fullName !== undefined) {
        staff.fullName = payload.fullName;
    }
    //TODO: check email exists
    if(payload.email !== undefined) {
        staff.email = payload.email;
    }
    if(payload.active !== undefined) {
        staff.active = payload.active;
    }
    if(payload.role !== undefined) {
        staff.role = payload.role;
    }
    if(payload.password !== undefined) {
        staff.password = payload.password;
    }

	// step3: lưu lại
	await staff.save();
	return staff;
}

const deleteById = async (id: string) => {
	const staff = await findById({ id });
	if (!staff) {
		throw createError(404, "Staff not found");
	}
	await Staff.findByIdAndDelete(staff._id);
	return staff;
}

export default {
	findAll,
	findById,
	create,
	updateById,
	deleteById,
}

