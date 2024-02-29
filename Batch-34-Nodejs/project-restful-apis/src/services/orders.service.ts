import createError from 'http-errors';
import Order from '../models/order.model';
import { IOrder, ICustomer } from "../types/models";
import customersService from './customers.service';
/*
 * Lấy tất cả các Order
 */
const findAll = async (page: number, limit: number) => {
    const orders = await Order.find().
    populate('customer', '-__v').
    select('-__v').
    skip((page - 1) * limit).
    limit(limit);
    /// get total documents in the Categories collection 
  const totalRecords = await Order.count();

  //return response with Categories, total pages, and current page
  return {
    orders,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit
  };
}

/**
 * Lấy một Order bằng ID
 */
const findById = async (id: string) => {
    const result = await Order.findById(id);

    if (!result) {
        throw createError(404, `Order not found`);
    }

    return result;
}

// Lấy một Order bằng ID
const getById = async (id: string) => {
    const result = await Order.findById(id);

    console.log("<<< getById >>>", id, result);

    if (!result) {
        throw createError(404, "Order not found");
    }

    return result;
};

// Tạo một Order mới
const create = async (payload: any) => {
    console.log("createOrder");
    //B1. Tạo customer trước
    const createDataCustomer = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        address: payload.shippingAddress+ ' '+payload.shippingCity
    }
    const customer = await customersService.createItem(createDataCustomer);
    //b2. Tạo Order sau
    const createDataOrder = {
        createdDate: new Date,
        description: payload.description,
        shippingAddress: payload.shippingAddress,
        shippingCity: payload.shippingCity,
        paymentType: payload.paymentType,
        orderDetail: payload.orderDetail,
        customer: customer._id
    }
    // Lưu xuống cơ sở dữ liệu
    const result = await Order.create(createDataOrder);

    /* Trả lại thông tin cho response */
    return result;
};

// Cập nhật một Order bằng ID
const updateById = async (id: string, payload: IOrder) => {
    // Lấy lại Order bằng ID
    const order = await getById(id);

    Object.assign(order, payload); // Ghi đè thông tin
    await order.save();

    return order;
};

// Xóa một Order bằng ID
const deleteById = async (id: string) => {
    console.log("deleteOrderById");

    // Lấy lại Order bằng ID
    const order = await getById(id);

    await order.deleteOne({ _id: order._id });

    // Trả về Order trước khi xóa
    return order;
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};