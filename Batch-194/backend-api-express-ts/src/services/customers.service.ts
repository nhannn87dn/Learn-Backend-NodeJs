import createError from 'http-errors';
import { ICustomerDTO } from "../types/customers";
import Customer from "../models/Customer.model";

const findAll = async (query: any) => {
    //SELECT * FROM customers
    // const customers = await Customer.find();

    //Lấy tất cả customers CÓ phân trang
    //Mặc định page=1, limit=10 nếu không có truyền vào
    const { page = 1, limit = 10 } = query;
    const customers = await Customer
        .find() //cấu hình điều kiện where
        .select('-password') //loại bỏ trường password không cần thiết
        //thuật toán phân trang
        .skip((page - 1) * limit) //bỏ qua bao nhiêu bản ghi
        .limit(limit);//lấy tối đa bao nhiêu bản ghi

    //lấy tổng số bản ghi của customer
    const total = await Customer.countDocuments();
    return {
        items: customers,
        pagination: {
            totalRecords: total,
            totalPage: Math.ceil(total / limit),
            currentPage: Number(page),
            limit: Number(limit),
        }
    };
}

const findById = async ({ id }: { id: string }) => {
    //SELECT * FROM customers WHERE id = ?
    const customer = await Customer.findById(id).select('-password');
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!customer) {
        throw createError(404, "Customer not found")
    }
    return customer
}


const create = async (customerDto: ICustomerDTO) => {
    const customer = new Customer({
        first_name: customerDto.first_name,
        last_name: customerDto.last_name,
        phone: customerDto.phone,
        email: customerDto.email,
        street: customerDto.street,
        city: customerDto.city,
        state: customerDto.state,
        zip_code: customerDto.zip_code,
        password: customerDto.password,
        active: customerDto.active || true,
    });
    const result = await customer.save();
    return result
}

const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<ICustomerDTO>
}) => {
    //step1: Check xem trong db co ton tai record co id khong
    let customer = await findById({ id });
    if (!customer) {
        throw createError(404, "Customer not found")
    }

    //Step 2: Xử lý update khi có thay đổi
    Object.assign(customer, payload);//merge 2 object lại với nhau

    //Lưu lại vào db
    await customer.save();
    return customer
}

const deleteById = async (id: string) => {
    const customer = await findById({ id });
    if (!customer) {
        throw createError(404, "Customer not found")
    }
    //step2: Xoa neu co ton tai
    await Customer.findByIdAndDelete(customer._id);
    //Trả về customer đã xóa
    return customer;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}
