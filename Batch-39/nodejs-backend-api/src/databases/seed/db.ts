//File này dùng để tạo dữ liệu cho database

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

  for (let index = 1; index < 6; index++) {
    
    const category = new Category({
      category_name: faker.commerce.department()+index,
      description: faker.lorem.text(),
      slug: faker.lorem.slug()+index,
    });
    //Đến bước nó mới chính thức ghi xuống DB
    await category.save();
    console.log('Tạo danh mục thành công....', index);
  }

  //Tạo brands từ mảng có sẵn
 await Brand.insertMany(brands)
  
 const currentBrands = await Brand.find();
 const currentCategories = await Category.find();

 
   for (let i = 1; i <= 15; i++) {

    let productName = faker.commerce.productName()+i;
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

    const fakeProduct = {
      product_name: productName,
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
}

  

try {
  runDB()
} catch (error) {
  console.log(error);
}