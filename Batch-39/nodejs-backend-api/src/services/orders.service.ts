import createError from 'http-errors';
// Kết nối trực tiếp với Database
import Order from '../models/orders.model';
import { IOrder } from '../types/models';
import Customer from '../models/customers.model';
import nodemailer from 'nodemailer';

// Tạo transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'ecshopvietnamese@gmail.com',
      pass: 'bhvksgtrvzrsukqk' //mật khẩu ứng dụng
  }
} as nodemailer.TransportOptions);


// Lấy tất cả record
const findAll = async (query: any)=>{
   /* Phân trang */
  const page_str = query.page;
  const limit_str = query.limit;
  const orderStatus_str = query.order_status;
  const paymentType_str = query.payment_type;

  const page = page_str ? parseInt(page_str as string): 1;
  const limit = limit_str ? parseInt(limit_str as string): 10;

  const payment_type = paymentType_str ? parseInt(paymentType_str as string): 0;
  const order_status = orderStatus_str ? parseInt(orderStatus_str as string): 0;

  
  /* Sắp xếp */
  let objSort: any = {};
  const sortBy = query.sort || 'createdAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == 'ASC' ? 1: -1
  objSort = {...objSort, [sortBy]: orderBy} // Thêm phần tử sắp xếp động vào object {}

  const offset = (page - 1) * limit;

  let objectCustomerFilters : any = {};
  let objectOrderFilters : any = {};
  // Lọc theo số ĐT
  if(query.phone && query.phone != ''){
    objectCustomerFilters = {...objectCustomerFilters, phone: new RegExp(query.phone, 'i')}
  }
  // Lọc theo số Tên
  if (query.keyword && query.keyword !== '') {
    objectCustomerFilters = {
      ...objectCustomerFilters,
      $or: [
        { first_name: new RegExp(query.keyword, 'i') },
        { last_name: new RegExp(query.keyword, 'i') }
      ]
    };
  }
   // Lọc theo order_status
  if(order_status != 0){
    objectOrderFilters = {...objectOrderFilters, order_status: order_status}
  }
  // lọc theo payment_type
  if(payment_type != 0){
    objectOrderFilters = {...objectOrderFilters, payment_type: payment_type}
  }

  /* Select * FROM product */
  const orders = await Order
  .find(objectOrderFilters)
  .select('-__v -id')
  .populate({
    path: 'customer',
    /**
     * Với match, nếu ko khớp thì customer là null
     */
    match: objectCustomerFilters
  })
  .populate({
    path: 'staff',
  })
  .populate('order_items.product', '_id product_name price slug thumbnail')
  .sort(objSort)
  .skip(offset)
  .limit(limit)
  .lean({virtuals: true})
  ;

  console.log('<<=== 🚀 orders ===>>',orders);

   /**
     * Với match, nếu ko khớp thì customer là null
     * Do vậy nếu customer null ko thỏa mãn thì bỏ qua
     */
   // Lọc ra các orders mà có customer không null (có kết quả phù hợp)
   const ordersWithConditions = orders.filter(order => order.customer);

  const totalRecords = ordersWithConditions.length;

  return {
    orders_list: ordersWithConditions,
    sorts: objSort,
    filters: {},
    // Phân trang
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit), //tổng số trang
      totalRecords
    }
  }
}

// Tìm 1 record theo ID
const findById = async (id: string)=>{
   
    //Đi tìm 1 cái khớp id
     /**
     * SELECT * FROM orders WHERE id = ''
     */
    const order = await Order
    .findById(id)
    .populate('customer', '-__v -password')
    .populate('staff', '-__v -password')
    .populate('order_items.product', '_id product_name slug thumbnail')
    .lean({virtuals: true})
    
     /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!order){
      throw createError(400, 'Order Not Found')
    }

    return order
}

/*
Logic tạo đơn hàng 
1. Nếu khách đã login thì check và lấy thông tin customer từ header, dựa vào token
2. Nếu chưa login thì check nếu tồn tại email, mobile chưa. Nếu chưa thì tạo mới customer
3. Tạo đơn dựa trên thông tin customer
4. Mặc định để thông tin staff là null, vì chưa có ai duyệt đơn
*/

const createRecord = async (payload: any, customerLogined: any)=>{
  console.log('<<=== 🚀 payload order ===>>',payload);
  //TH 2. Khách đã login
  if(customerLogined && customerLogined._id){
    const payload_order = {
      customer: customerLogined._id,
      payment_type: payload.payment_type,
      street: payload.customer.street,
      city: payload.customer.city,
      state: payload.customer.state,
      order_note: payload.order_note,
      order_items: payload.order_items
     
    }
    const order = await Order.create(payload_order)

    if(order){
      console.log('Tao don thanh cong', payload.customer.email);
      // Tạo nội dung email
      const mailOptions = {
        from: 'ecshopvietnamese@gmail.com',
        to: payload.customer.email, //email khach hang
        subject: 'Xac nhan dat hang 2',
        text: 'Hello world! 2'
      };

      // Gửi email
      transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
    }

    return order;
  }



  //TH 1. Khách hàng chưa tồn tại tại trong hệ thống
 
  if(!payload.customer){
      throw createError(400, 'Thông tin khách hàng không hợp lệ')
    }
  //Đi tạo tạo khách hàng mới
  const customer = await Customer.create(payload.customer)
  //Sau đó tạo đơn
  const payload_order = {
    customer: customer._id,
    payment_type: payload.payment_type,
    street: customer.street,
    city: customer.city,
    state: customer.state,
    order_note: payload.order_note,
    order_items: payload.order_items
  }
  const order = await Order.create(payload_order)

  if(order){
    console.log('Tao don thanh cong', payload.customer.email);
    // Tạo nội dung email
    const mailOptions = {
      from: 'ecshopvietnamese@gmail.com',
      to: payload.customer.email, //email khach hang
      subject: 'Xac nhan dat hang 2',
      text: 'Hello world! 2'
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
    });
  }
  
  return order
 
 
}

const updateById = async (id: string, payload: IOrder)=>{
  
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const order = await Order.findByIdAndUpdate(id, payload, {
      new: true, // nó trả về record sau khi update
    })
    console.log('<<=== 🚀 order ===>>',order);

    /* Bắt lỗi khi ko tìm thấy thông tin */
    if(!order){
      throw createError(400, 'Order Not Found')
    }
    
    //Return về record vừa đc update
    return order
}

const deleteById = async (id: string)=>{
  
  //b1 Kiểm tra xem tồn tại order có id
  const order = await Order.findByIdAndDelete(id)

  if(!order){
    throw createError(400, "Order Not Found")
  }


  //Return về record vừa xóa
  return order
}


export default {
  findAll,
  findById,
  createRecord,
  updateById,
  deleteById
}