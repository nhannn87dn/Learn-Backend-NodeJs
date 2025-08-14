import createError from "http-errors";
import Order from "../models/Order.model";
import customerService from "./customer.service";
import { IOrderDTO } from "../types/model";
import Customer from "../models/Customer.model";

const findAll = async (query: any) => {
  console.log('<<=== 🚀 query ===>>',query);
  const { page = 1, limit = 5, keyword = null, sort_type = 'desc', sort_by='createdAt', order_status = null, customer_id = null } = query;

  console.log('<<=== 🚀 keyword ===>>',keyword);

  let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

  const where: any = {};
  //Nếu cần lọc thì đưa vào where
  if(keyword) {
    where.$or = [
      { first_name: { $regex: keyword, $options: 'i' } },
      { last_name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
      { phone: { $regex: keyword, $options: 'i' } }
    ];
  }
  if(order_status) {
    where.order_status = order_status;
  }
  if(customer_id) {
    where.customer = customer_id;
  }

  const skip = (page - 1) * limit;
  const orders = await Order.find({
    ...where,
    isDelete: false
  })
    .skip(skip)
    .limit(limit)
    .sort({...sortObject})
    .populate("customer", "first_name last_name email phone")
    .populate("staff", "first_name last_name")
    .populate("order_items.product", "product_name price thumbnail");
  return {
    orders,
    page,
    limit,
    totalRecords: await Order.countDocuments({ isDelete: false }),
  };
};

const findById = async (id: string) => {
  const order = await Order.findById(id)
    .populate("customer", "first_name last_name email phone")
    .populate("staff", "first_name last_name")
    .populate("order_items.product", "product_name price thumbnail");
  if (!order || order.isDelete) {
    throw createError(400, "Order not found");
  }
  return order;
};

const create = async(payload: IOrderDTO) => {

  //b1. Kiem tra khach hang da ton tai hay chua
 const customerExists = await Customer.findOne({
    $or: [
      { email: payload.customer.email },
      { phone: payload.customer.phone }
    ] 
  })

  //Neu chua thi tao khach hang moi
  if(!customerExists) {
    const newCustomer = new Customer({
      email: payload.customer.email,
      first_name: payload.customer.first_name,
      last_name: payload.customer.last_name,
      phone: payload.customer.phone,
      street: payload.customer.street,
      city: payload.customer.city,
      state: payload.customer.state,
      zip_code: payload.customer.zip_code,
    });
    const customer = await newCustomer.save();
    //tao don moi voi thong tin khach hang moi
    const newOrder = new Order({
      customer: customer._id,
      order_status:  1,
      payment_type: payload.payment_type || 4,
      order_date: new Date(),
      order_note: payload.order_note,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      street: customer.street,
      city: customer.city,
      state: customer.state,
      zip_code: customer.zip_code,
      order_items: payload.order_items,
    });
    return await newOrder.save();
  }
  //neu da ton tai roi
  else {
    //tao don moi voi thong tin khach hang da ton tai, nhung chi lay id, con lai dua vao payload.customer
    const newOrder = new Order({
      customer: customerExists._id, // chỉ lấy id của khách hàng đã tồn tại
      order_status:  1,
      payment_type: payload.payment_type || 4,
      order_date: new Date(),
      order_note: payload.order_note,
      first_name: payload.customer.first_name, // lay thong tin khach hang tu form
      last_name: payload.customer.last_name,
      phone: payload.customer.phone,
      email: payload.customer.email,
      street: payload.customer.street,
      city: payload.customer.city,
      state: payload.customer.state,
      zip_code: payload.customer.zip_code,
      order_items: payload.order_items,
    });
    return await newOrder.save();
  }


};

const updateById = async (id: string, payload: any) => {
  const order = await findById(id);
  Object.assign(order, payload);
  await order.save();
  return order;
};

const deleteById = async (id: string) => {
  const order = await findById(id);
  // Chỉ cho phép xóa đơn hàng đã hủy (order_status = 3)
  if (order.order_status !== 3) {
    throw createError(400, "Cannot delete order that is not rejected");
  }
  // Soft delete - chỉ update isDelete = true
  order.isDelete = true;
  await order.save();
  return order;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
