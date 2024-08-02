
import mongoose from 'mongoose'
import {globalConfig} from '../../constants/configs'
import Category from '../../models/categories.model';
import { faker } from '@faker-js/faker';
import Brand from '../../models/brands.model';
import Product from '../../models/products.model';

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

const runDB = async ()=>{
  //1. SELECT * FROM product
  // const products = await Product.find()
  // console.log('<<=== 🚀 products ===>>',products);

  //2. SELECT * FROM product WHERE category = ''
  // const products = await Product.find({
  //   category: '66acd7a76977747d54d18440'
  // })
  // console.log('<<=== 🚀 products ===>>',products);

  //3. SELECT * FROM product WHERE price > ?
  // const products = await Product.find({
  //   price: {$gt: 700}
  // })
  // console.log('<<=== 🚀 products ===>>',products.length, products, );

  //4. SELECT product_name, price, discount FROM product
  // const products = await Product.find().
  // select('product_name, price, discount -__v')
  // console.log('<<=== 🚀 products ===>>',products.length, products, );


  //5. SELECT product_name, price, discount FROM product WHERE product_name LIKE
  // const products = await Product.find({
  //   //product_name: { $regex: 'frozen', $options: 'i' }
  //   product_name: /frozen/i
  // }).
  // select('-__v')
  // .exec()
  // console.log('<<=== 🚀 products ===>>',products.length, products, );

  //6. SELECT product_name, price, discount FROM product ORDER BY price ASC
  // const products = await Product.find().
  // select('product_name price discount')
  // .sort({
  //   //price: 1 //1 là tăng dần
  //   price: -1 // giảm dần
  // })
  // console.log('<<=== 🚀 products ===>>',products.length, products, );

  //6. Join product với categories
  const products = await Product.find()
  .populate('category') // lấy tất cả trường bên Category qua
  .select('product_name price discount')
  .sort({
    //price: 1 //1 là tăng dần
    price: -1 // giảm dần
  })
  console.log('<<=== 🚀 products ===>>',products.length, products, );    
}


  try {
    runDB()
  } catch (error) {
    console.log(error);
  }