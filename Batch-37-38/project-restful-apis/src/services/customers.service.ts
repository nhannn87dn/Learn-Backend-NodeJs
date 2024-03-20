import createError from 'http-errors';
import Customer from '../models/customer.model';
import { ICustomer } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Customer.find();
    return result
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