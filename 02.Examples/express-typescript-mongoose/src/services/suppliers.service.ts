import createError from 'http-errors';
import Supplier from '../models/Supplier.model';
import { ISupplier } from "../types/models";

/**
 * Lấy tất cả các nhà cung cấp
 */
const findAll = async () => {
    const result = await Supplier.find();
    return result;
}

/**
 * Lấy một nhà cung cấp bằng ID
 */
const findById = async (id: string) => {
    const result = await Supplier.findById(id);

    if (!result) {
        throw createError(404, `Nhà cung cấp không tồn tại`);
    }

    return result;
}

// Lấy một nhà cung cấp bằng ID
const getById = async (id: string) => {
    const result = await Supplier.findById(id);

    console.log("<<< getById >>>", id, result);

    if (!result) {
        throw createError(404, "Nhà cung cấp không tồn tại");
    }

    return result;
};

// Tạo một nhà cung cấp mới
const create = async (payload: ISupplier) => {
    console.log("createSupplier");

    // Lưu xuống cơ sở dữ liệu
    const result = await Supplier.create(payload);

    /* Trả lại thông tin cho response */
    return result;
};

// Cập nhật một nhà cung cấp bằng ID
const updateById = async (id: string, payload: ISupplier) => {
    // Lấy lại nhà cung cấp bằng ID
    const supplier = await getById(id);

    Object.assign(supplier, payload); // Ghi đè thông tin
    await supplier.save();

    return supplier;
};

// Xóa một nhà cung cấp bằng ID
const deleteById = async (id: string) => {
    console.log("deleteSupplierById");

    // Lấy lại nhà cung cấp bằng ID
    const supplier = await getById(id);

    await supplier.deleteOne({ _id: supplier._id });

    // Trả về nhà cung cấp trước khi xóa
    return supplier;
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};