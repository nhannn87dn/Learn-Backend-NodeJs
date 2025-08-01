import createError from "http-errors";
import Order from "../models/Order.model";

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

const create = (payload: any) => {
  const newOrder = new Order({
    customer: payload.customer,
    staff: payload.staff,
    order_status: payload.order_status || 1,
    payment_type: payload.payment_type || 4,
    order_date: payload.order_date || new Date(),
    require_date: payload.require_date,
    shipping_date: payload.shipping_date,
    order_note: payload.order_note,
    first_name: payload.first_name,
    last_name: payload.last_name,
    phone: payload.phone,
    email: payload.email,
    street: payload.street,
    city: payload.city,
    state: payload.state,
    zip_code: payload.zip_code,
    order_items: payload.order_items,
  });
  newOrder.save();
  return newOrder;
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
