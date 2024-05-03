import createError from 'http-errors';
import Order from '../models/order.model';
import { IOrder, IPayloadOrder,EnumOrderStatus, EnumPayments } from '../types/models';
import customersService from './customers.service';
//Tra lai ket qua
const getAll = async (query: any)=>{
    //Phân trang
    const currentPage = query &&  query.page ? parseInt(query.page as string) : 1; //trang hiện tại
    const pageSize = query &&  query.limit ? parseInt(query.limit as string) : 5; // Số lượng items trên 1 trang

    //Sắp xếp tùy chọn theo trường
    let sortObject : any = {}; //Mặc định theo trường sort ASC
    const sortBy = query &&  query.sortBy ? query.sortBy : 'createdAt'
    const sortType = query &&  query.sortType && query.sortType === "ASC" ? 1 : -1;
    //Thêm phần tử vảo object rỗng
    sortObject = {...sortObject, [sortBy]: sortType}
    
    //Đếm tổng số record hiện có của collection Product
    const count = await Order.countDocuments();

    //Lấy danh sách khớp với điều kiện cần lấy
    const orders = await Order
    .find({})
    .select('-__v')
    //Loại bỏ các trường không cần lấy
    .populate('customer', '-__v -isEmailVerified -sort -isActive -createdAt -updatedAt')
    .populate('staff', '-__v -isEmailVerified -password -role -sort -isActive -createdAt -updatedAt')
    //Nối quan hệ giữa product trong OrderItem với model Product
    //Chỉ lấy những trường cần lấy
    .populate('orderItems.product', '_id productName slug thumbnail')
    .sort(sortObject)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)

    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = orders.length;

    return {
        limit: pageSize,// số lượng item trên 1 trang
        page: currentPage, //trang hiện tại
        totalPages: Math.ceil(count / pageSize), //tổng số trang
        totalItems: count, //tổng số records
        filteredCount, //số record khớp điều kiện
        sortBy: sortObject,
        orders: orders
    }
}
const getOrderById  = async (id:string)=>{
    //SELECT * FROM orders WHERE _id = id
    const result = await Order.findById(id);

    if(!result){
        throw createError(404,'Order not found');
    }
    return result;
}

const createOrder = async (data: IPayloadOrder)=>{
    //B1 check tồn tại customer trước
    let  customerId = null;
    const customer = await customersService.findCustomer(
        data.customer.email || '',
        data.customer.phone
    )
    //Nếu chưa có thì tạo mới
    if(!customer){
        const newCustomer = await customersService.createCustomer({
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            email: data.customer.email,
            phone: data.customer.phone,
            address: data.customer.address,
            yard: data.customer.yard,
            district: data.customer.district,
            province: data.customer.province,
        });
        customerId = newCustomer._id;
    }
    else{
        customerId = customer?._id;
    }
    //Sau đó lấy id khách hàng để tạo đơn
    if(!customerId){
        throw createError(404,'ID Customer not found');
    }
    const result = await Order.create({
        customer: customerId,
        orderDate: new Date(),
        orderStatus: EnumOrderStatus.Pending,
        shippingAddress: data.customer.address,
        shippingYard: data.customer.yard,
        shippingDistrict: data.customer.district,
        shippingProvince: data.customer.province,
        paymentType: data.paymentType,
        orderNote: data?.orderNote || '',
        orderItems: data.orderItems,
        });

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