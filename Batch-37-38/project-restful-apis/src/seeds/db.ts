import { fakerVI as faker } from '@faker-js/faker'
import mongoose from "mongoose";
import Brand from '../models/brand.model'
import Category from '../models/category.model'
import Staff from '../models/staff.model'
import Customer from '../models/customer.model'
import Order from '../models/order.model'
import Product from '../models/product.model'
import { categories } from "./category";
import { brands } from "./brand";
import {EnumOrderStatus, EnumPayments} from '../types/models'
import dotenv from 'dotenv';
dotenv.config();

const MONGO_CONNECT = `mongodb+srv://nhan:67X.3Z2KEf$QhpK@cluster0.updfoes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, mongooseDbOptions)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Ham xoa trang du lieu
async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}

async function run(){
   await clearCollections();
   console.log('<<<< dropDatabase  >>>>');

   console.log('Begin building Data Test');

   // Create a new user with the generated password
  const staff = new Staff({
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@gmail.com',
    password: 'Admin@123456',
    role: 'admin',
    isEmailVerified: true,
  });
  await staff.save();
  console.log(`Create Staff Admin successfully !`);

  await Category.insertMany(categories);
  console.log(`Create Category successfully !`);

  await Brand.insertMany(brands);
  console.log(`Create brand successfully !`);

  // Tạo 10 khách hàng ngẫu nhiên
  for (let i = 1; i <= 10; i++) {

    const rPhone = faker.helpers.fromRegExp(/0[3|5|7|8|9][0-9]{8}/i);
    const fakeCustomer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: rPhone,
      address: faker.location.streetAddress(false),
      yard: faker.location.street(),
      district: faker.location.state(),
      province: faker.location.city(),
    }
    console.log(rPhone);
    const customer = new Customer(fakeCustomer);
    await customer.save();
    console.log(`Create Customer ${i} successfully !`);
  }

   // Tạo 15 sản phẩm ngẫu nhiên
   const currentBrands = await Brand.find();
   const currentCategories = await Category.find();

  for (let i = 1; i <= 15; i++) {

    let productName = faker.commerce.productName();
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

    const fakeProduct = {
      productName: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category: category._id,
      brandId: brand._id,
      description: faker.commerce.productDescription(),
      model_year: faker.helpers.fromRegExp('2[0-9]{3}'),
      stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
      thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
      slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    }
    const product = new Product(fakeProduct);
    await product.save();
    console.log(`Create Product ${i} successfully !`);
    
  }


  const customers = await Customer.find();
  const staffs = await Staff.find();
  const products = await Product.find();
  //Tạo 50 đơn hàng ngẩu nhiên
  for (let i = 1; i <= 50; i++) {

    const customer = customers[Math.floor(Math.random() * customers.length)];
    const staff = staffs[Math.floor(Math.random() * staffs.length)];

    const randomDate = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2024-02-01T00:00:00.000Z' });

    //Tạo danh sách sản phẩm cho đơn hàng
    const orderItems = [];
    for (let j = 1; j <= 3; j++) {

      const product_random = products[Math.floor(Math.random() * products.length)];

      const product = {
        product: product_random._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: product_random.price,
        discount: product_random.discount,
      };

      orderItems.push(product);
    }
    
    
    const fakeOrder = {
      orderDate: randomDate,
      orderStatus:EnumOrderStatus.Pending,
      shippingAddress: customer.address,
      shippingYard: customer.yard,
      shippingDistrict: customer.district,
      shippingProvince: customer.province,
      paymentType: EnumPayments.Cod,
      customer: customer._id,
      staff: staff._id,
      orderItems: orderItems,
    }
    const order = new Order(fakeOrder);
    order.createdAt = randomDate;
    await order.save();
    console.log(`Create Order ${i} successfully !`);
    
  }

}


//CHẠY HÀM TẠO DATA TEST
console.log('Gen Data Test ....');
try {
  run();
} catch (error) {
  console.log(error);
}
