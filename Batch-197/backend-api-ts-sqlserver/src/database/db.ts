import { ENV } from "../config/env";
import Category from "../models/category.model";
import Brand from "../models/brand.model";
import Product from "../models/product.model";
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';


//step 1: connect to mongodb
//kết nối mongodb qua mongoose
mongoose.connect(ENV.MONGODB_URI, {
  autoIndex: true, // Tự động tạo index từ schema
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Thoát ứng dụng nếu không kết nối được
});


// Function to create a new category
const runDB = async () => {
    //random 5 categories
    // for (let i = 0; i < 5; i++) {

    //     const category_name  = faker.commerce.department() + ' ' + i;
    //     // Create a new category instance 1
    //     // create-a-new-category-instance-1

    //     const category = new Category({
    //         category_name: category_name,
    //         description: faker.lorem.sentence(),
    //         slug: faker.helpers.slugify(category_name).toLowerCase(),
    //     });
    //     await category.save();
    //     console.log(`Fake brand ${i} success`);
    // }

    //random 5 brands
    for (let i = 0; i < 5; i++) {
        const brand_name = faker.company.name() + ' ' + i;
        // Create a new brand instance
        const brand = new Brand({
            brand_name: brand_name,
            description: faker.lorem.sentence(),
            slug: faker.helpers.slugify(brand_name).toLowerCase(),
        });
        await brand.save();
        console.log(`Fake brand ${i} success`);
    }

    //random 30 products
    const currentBrands = await Brand.find();
    const currentCategories = await Category.find();

    for (let i = 0; i < 30; i++) {
            const productName = faker.commerce.productName() + " " + i;
            const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
            const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];
        // Create a new product instance
        const product = new Product({
            product_name: productName,
            description: faker.lorem.paragraph(),
            price: parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
            discount: faker.number.int({ min: 0, max: 70 }),
            stock: faker.number.int({ min: 0, max: 100 }),
            category: category._id, // Random category
            brand: brand._id, // Random brand
            slug: faker.helpers.slugify(productName).toLowerCase(),
            model_year: faker.number.int({ min: 2000, max: 2024 }),
            thumbnail: faker.image.urlPicsumPhotos({ width: 128, height: 128}),
        });
        await product.save();
        console.log(`Fake product ${i} success`);
    }
}

runDB();