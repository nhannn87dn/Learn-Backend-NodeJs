import createError from 'http-errors';
import Customer from '../models/customer.model';
import { ICustomer } from '../types/models';
//Tra lai ket qua
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'sort'
    const sortType = query &&  query.sortType && query.sortType === "DESC" ? -1 : 1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Customer.countDocuments();

    //Lấy danh sách khớp với điều kiện cần lấy
    const customers = await Customer
    .find({})
    .select('-__v')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = customers.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        sortBy: sortObject,
        customers: customers
    }
}

const getCustomerById  = async (id:string)=>{
    //SELECT * FROM customers WHERE _id = id
    const result = await Customer.findById(id);

    if(!result){
        throw createError(404,'Customer not found');
    }
    return result;
}

const createCustomer = async (data: ICustomer)=>{
    const result = await Customer.create(data)
    return result;
}

const updateCustomer = async (id: string,payload: ICustomer)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const customer = await getCustomerById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(customer, payload);
    await customer.save();

    return customer
}

const deleteCustomer = async (id:string)=>{
   
    // const customer = await Customer.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const customer = await getCustomerById(id);
    await Customer.deleteOne({ _id: customer._id });
    return customer
}

export default {
    getAll,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}