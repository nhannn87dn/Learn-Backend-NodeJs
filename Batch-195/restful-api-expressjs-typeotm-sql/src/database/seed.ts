import mongoose from "mongoose"
import { getEnv } from "../common/configs/env";
import { faker } from '@faker-js/faker';
import Brand from '../models/brand.model'
import Category from '../models/category.model'
import Product from "../models/product.model";


//step 1: Ket noi den MongoDB
mongoose
  .connect(getEnv().MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    //should listen app here
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

//step 2: Fake data vao collection
const fakeData = async () => {
  //Your fake data logic here

  //new fake 5 brand
    //   for (let index = 1; index <= 5; index++) {
    //     const brandName = faker.company.buzzNoun()+index;
    //     const brand = new Brand({
    //       brand_name: brandName,
    //       description: faker.company.catchPhrase(),
    //       slug: faker.helpers.slugify(brandName).toLocaleLowerCase(),
    //     });
    //     await brand.save();
    //     console.log('Fake brand is success', index);
        
    //   }


      // insert 5 fake categories
    for (let index = 1; index <= 5; index++) {
      //dien thoai
      const categoryName = faker.commerce.department()+index;
      const category = new Category({
        category_name: categoryName,
         description: faker.lorem.word(10),
         //dien-thoai
         slug: faker.helpers.slugify(categoryName).toLocaleLowerCase(),
      });
      await category.save();
      console.log('Fake categoryName is success', index);
      
    }

    //fake 30 products
    const currentBrands = await Brand.find();
   const currentCategories = await Category.find();

   console.log('<<=== 🚀 currentCategories ===>>',currentCategories);
   console.log('<<=== 🚀 currentBrands ===>>',currentBrands);

     for (let i = 1; i <= 30; i++) {

    let productName = faker.commerce.productName()+i;
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

    console.log('<<=== 🚀 brand ===>>',brand);
    console.log('<<=== 🚀 category ===>>',category);

    if(!brand || !category) {
      console.log('Brand or Category not found, skip creating product');
      break;
    }

    const fakeProduct = {
      product_name: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category: category._id,
      brand: brand._id,
      description: faker.commerce.productDescription(),
      modelYear: faker.number.int({ min: 1900, max: 2024 }),
      stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
      thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
      slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    }
   
    const product = new Product(fakeProduct);
    await product.save();
    console.log(`Create Product ${i} successfully !`);
    
  }
};

fakeData(); //run