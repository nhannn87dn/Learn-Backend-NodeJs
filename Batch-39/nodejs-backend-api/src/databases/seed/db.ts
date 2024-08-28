//File này dùng để tạo dữ liệu cho database

import mongoose from 'mongoose'
import {globalConfig} from '../../constants/configs'
import Category from '../../models/categories.model';
import { faker } from '@faker-js/faker';
import Brand from '../../models/brands.model';
import Product from '../../models/products.model';
import Customer from '../../models/customers.model';
import { EnumOrderStatus, EnumPayments } from '../../types/models';
import Order from '../../models/orders.model';
import Staff from '../../models/staffs.model';

const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(globalConfig.MONGODB_URL as string, mongooseDbOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    //should listen app here
  })
  .catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
  });

  const brands = [
    {
        brand_name: "Trek",
        description: "High-quality bikes for all terrains",
        slug: "trek"
    },
    {
        brand_name: "Giant",
        description: "Specializing in road and mountain bikes",
        slug: "giant"
    },
    {
        brand_name: "Specialized",
        description: "Innovative designs for cycling enthusiasts",
        slug: "specialized"
    },
    {
        brand_name: "Cannondale",
        description: "Known for its performance-oriented bicycles",
        slug: "cannondale"
    },
    {
        brand_name: "Scott",
        description: "Offers a wide range of bicycles for various purposes",
        slug: "scott"
    }
];


const runDB = async ()=>{
  console.log('runDB running....');
  //tạo mới 5 danh mục ngẫu nhiên

//   for (let index = 1; index < 6; index++) {
    
//     const category = new Category({
//       category_name: faker.commerce.department()+index,
//       description: faker.lorem.words(50),
//       slug: faker.lorem.slug()+index,
//     });
//     //Đến bước nó mới chính thức ghi xuống DB
//     await category.save();
//     console.log('Tạo danh mục thành công....', index);
//   }

//   //Tạo brands từ mảng có sẵn
//  await Brand.insertMany(brands)
  
//  const currentBrands = await Brand.find();
//  const currentCategories = await Category.find();

 
//    for (let i = 1; i <= 15; i++) {

//     let productName = faker.commerce.productName()+i;
    
//     const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
//     const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

//     const fakeProduct = {
//       product_name: productName,
//       price: faker.commerce.price({ min: 100, max: 1200 }),
//       discount: faker.number.int({ min: 1, max: 50 }),
//       category: category._id,
//       brandId: brand._id,
//       description: faker.commerce.productDescription(),
//       model_year: faker.helpers.fromRegExp('2[0-9]{3}'),
//       stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
//       thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
//       slug: faker.helpers.slugify(productName), // Tạo slug từ productName
//     }
   
//     const product = new Product(fakeProduct);
//     await product.save();
//     console.log(`Create Product ${i} successfully !`);
    
//   }
  

  // Tạo 10 khách hàng ngẫu nhiên
  for (let i = 1; i <= 10; i++) {

    const rPhone = faker.helpers.fromRegExp(/0[3|5|7|8|9][0-9]{8}/i);
    const fakeCustomer = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: rPhone,
      street: faker.location.streetAddress(false),
      state: faker.location.state(),
      city: faker.location.city(),
    }
    const customer = new Customer(fakeCustomer);
    await customer.save();
    console.log(`Create Customer ${i} successfully !`);
  } 
  // const customers = await Customer.find();
  // const staffs = await Staff.find();
  // const products = await Product.find();

  // //Tạo 50 đơn hàng ngẩu nhiên
  // for (let i = 1; i <= 50; i++) {

  //   const customer = customers[Math.floor(Math.random() * customers.length)];
  //   const staff = staffs[Math.floor(Math.random() * staffs.length)];

  //   const randomDate = faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2024-02-01T00:00:00.000Z' });

  //   //Tạo danh sách sản phẩm cho đơn hàng
  //   const orderItems = [];
  //   for (let j = 1; j <= 3; j++) {

  //     const product_random = products[Math.floor(Math.random() * products.length)];

  //     const product = {
  //       product: product_random._id,
  //       quantity: faker.number.int({ min: 1, max: 5 }),
  //       price: product_random.price,
  //       discount: product_random.discount,
  //     };

  //     orderItems.push(product);
  //   }
    
    
  //   const fakeOrder = {
  //     order_date: randomDate,
  //     order_status: faker.number.int({ min: 1, max: 4 }),
  //     street: customer.street,
  //     city: customer.city,
  //     state: customer.state,
  //     payment_type: faker.number.int({ min: 1, max: 4 }),
  //     customer: customer._id,
  //     staff: staff._id,
  //     order_items: orderItems,
  //   }
  //   const order = new Order(fakeOrder);
  //   order.createdAt = randomDate;
  //   await order.save();
  //   console.log(`Create Order ${i} successfully !`);
    
  // }

}//end RunDB

  

try {
  runDB()
} catch (error) {
  console.log(error);
}