import createError from 'http-errors';
import Order from '../models/order.model';
import Customer from '../models/customer.model';
import { IOrder, IOrderDTO } from '../types/model';
import nodemailer from 'nodemailer';
// Kết nối trực tiếp với Database

// Tạo transporter
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
const getAll = async (query: any)=>{
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
const getById = async (id: string)=>{
   
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

const create = async (payload: IOrderDTO, customerLogined: any)=>{
  console.log('<<=== 🚀 payload order ===>>',payload);
 
  //check xem đã chọn phương thức thanh toán chưa. Nói chung các trường yêu cầu
  
  //TH 2. Khách đã login dựa vào token, giải mã lấy thông tin khách hàng từ token
  if(customerLogined && customerLogined._id){
    console.log('1---');
     const payload_order = {
      customer: customerLogined._id,
      payment_type: payload.payment_type,
      street: payload.customer.street, //láy từ từ payload, ko lấy từ customerLogined
      city: payload.customer.city, //láy từ từ payload, ko lấy từ customerLogined
      state: payload.customer.state, //láy từ từ payload, ko lấy từ customerLogined
      order_note: payload.order_note,
      order_items: payload.order_items
    }
    const order = await Order.create(payload_order)
    return order;
  }



  //TH 1. Khách hàng ko login
  
  if(!payload.customer){
    throw createError(400, 'Thông tin khách hàng không hợp lệ')
  }

  ///Step 1 check xem khách đã tồn tại chưa
 
  const customerExists = await Customer.findOne({
    $or: [
      { email: payload.customer.email },
      { phone: payload.customer.phone }
    ] 
  })
  let payload_order = null;
  //Nếu chưa ===> Đi tạo tạo khách hàng mới
  if(!customerExists){
    console.log('2---');
     //TODO: check tồn tại email, tồn tại mobile của khác chưa
    const customer = await Customer.create(payload.customer)
      //Sau đó tạo đơn
       payload_order = {
        customer: customer._id, //lấy id vừa tạo từ customer
        payment_type: payload.payment_type,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        order_note: payload.order_note,
        order_items: payload.order_items
      }
  }
  //Nếu rồi
  else{
    console.log('3---');
     payload_order = {
      customer: customerExists._id,
      payment_type: payload.payment_type,
      street: payload.customer.street, //láy từ từ payload, ko lấy từ customerLogined
      city: payload.customer.city, //láy từ từ payload, ko lấy từ customerLogined
      state: payload.customer.state, //láy từ từ payload, ko lấy từ customerLogined
      order_note: payload.order_note,
      order_items: payload.order_items
    }
  }
  
  const order = await Order.create(payload_order)
  if(order){
    //gui email thong bao don hang
    // Tạo nội dung email
    const mailOptions = {
      from: 'nhannn@softech.vn', // email người gửi
      to: payload.customer.email, // email người nhận
      //cc: 'emailcc @gmail.com',
      subject: 'Email xác nhận đơn hàng ' + new Date(), // tiêu đề email
     // text: 'Hello world!', //nội dung với plain text
      html: `<p><strong>Chào ${payload.customer.first_name}</strong></p>
      <p>Thông tin đơn hàng: </p>
      <p>Sản phẩm: </p>`, // html body
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
  getAll,
  getById,
  create,
  updateById,
  deleteById
}