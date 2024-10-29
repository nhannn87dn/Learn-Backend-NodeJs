import { faker } from "@faker-js/faker";
import Category from "../models/category.model";
import mongoose from "mongoose";
import Brand from "../models/brand.model";
import Product from "../models/product.model";
// Kết nối MongoDB
const connectionString: string = "mongodb://localhost:27017/Batch188";
mongoose
  .connect(connectionString, {
    dbName: "Batch188", //Database name
    maxPoolSize: 100, //Max pool size
    //socketTimeoutMS: 60, //Socket timeout
  })
  .then(() => {
    console.log("Connected to MongoDB");
    //Ket noi thanh cong ==> moi di listen express server
    
  })
  .catch((error) => console.error("MongoDB connection error:", error));

const runDB = async()=>{
    for (let i = 0; i < 10; i++) {
        const categoryName = faker.commerce.product() + i;
      const newCategory = new Category({
        category_name: categoryName,
        description: faker.lorem.paragraph(),
        slug: faker.helpers.slugify(categoryName)
      });
      await newCategory.save();
    }
    console.log("Created 10 categories");

    for (let i = 0; i < 10; i++) {
      const brandName = faker.company.name() + i;
    const newBrand = new Brand({
      brand_name: brandName,
      description: faker.lorem.paragraph(),
      slug: faker.helpers.slugify(brandName)
    });
    await newBrand.save();
  }
  console.log("Created 10 brands");

  //Tao 50 product co thuong hieu, va thuoc cac danh muc da co
     const currentBrands = await Brand.find();
 const currentCategories = await Category.find();

    for (let i = 0; i < 50; i++) {
      const productName = faker.company.name() + i;
    
      const brandId = currentBrands[Math.floor(Math.random() * currentBrands.length)];
      const categoryId = currentCategories[Math.floor(Math.random() * currentCategories.length)];

      const newProduct = new Product({
      product_name: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category: categoryId._id,
      brand: brandId._id,
      thumbnail: 'https://placehold.co/400x400',
      description: faker.commerce.productDescription(),
      slug: faker.helpers.slugify(productName),
      model_year: faker.helpers.fromRegExp('2[0-9]{3}'),
      stock: faker.number.int({ min: 1, max: 200 })
    });
    await newProduct.save();
  }
  console.log("Created 50 products");

}
try {
    runDB();
} catch (error) {
    console.log('<<=== 🚀 error ===>>',error);
}