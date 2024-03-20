import createError from 'http-errors';
import Order from '../models/order.model';
import { IOrder } from '../types/models';
//Tra lai ket qua
const getAll = async ()=>{
    const result = await Order.find();
    return result
}

const getOrderById  = async (id:string)=>{
    //SELECT * FROM orders WHERE _id = id
    const result = await Order.findById(id);

    if(!result){
        throw createError(404,'Order not found');
    }
    return result;
}

const createOrder = async (data: IOrder)=>{
    const result = await Order.create(data)
    return result;
}

const updateOrder = async (id: string,payload: IOrder)=>{
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const order = await getOrderById(id);

    /**
     * Dùng assign để merge giữa cũ và mới lại với nhau
     * Sau đó save lại
     * Muốn update trường nào thì chỉ cần update trường đó
     */
    Object.assign(order, payload);
    await order.save();

    return order
}

const deleteOrder = async (id:string)=>{
   
    // const order = await Order.findByIdAndDelete(id);
    /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
    const order = await getOrderById(id);
    await Order.deleteOne({ _id: order._id });
    return order
}

export default {
    getAll,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}