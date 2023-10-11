import Product from "../models/products.model";
import Supplier from "../models/suppliers.model";
import Category from "../models/categories.model";
import mongoose from 'mongoose';
import { faker }  from '@faker-js/faker';

//Bước 1: Kết nối Với MongooDB

/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * @param1 connections string
 * @param1 optional configs
 */
mongoose
  .connect('mongodb://localhost:27017/NodejsTest', mongooseDbOptions)
  .then(() => {
     console.log('⚡️[MongoDB]: Connected successfully');
    //should listen app here
    
  })
  .catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
  });

async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}

//Bước 2: Tạo dữ liệu ảo

async function main(){

  //Xóa dữ liệu đang có nếu có
  await clearCollections();

  const categories = await Category.find();
  const suppliers = await Supplier.find();
  //Tạo 10 sản phẩm
  for (let index = 1; index < 11; index++) {

    //Lấy ngẫu nhiên một record
    const category = categories[Math.floor(Math.random() * categories.length)];
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];

    console.log('supplier',supplier);

    const payload = {
      name: faker.commerce.productName()+ ` ${index}`,
      price: faker.commerce.price(),
      discount: faker.number.int({ max: 90 }),
      stock: faker.number.int(100),
      description: faker.commerce.productDescription(),
      categoryId: category._id,
      supplier: supplier._id
    }
  const p =  await Product.create(payload);

    console.log(p);
  }
  //Chay xong
  console.log('Done');
  
}

//Bước 3: Lưu vào MongoDb
main();