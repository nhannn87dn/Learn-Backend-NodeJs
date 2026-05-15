import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { ENV } from '../config/env';
import Brand from '../models/Brand.model';
import Category from '../models/Category.model';
import Product from '../models/Product.model';

//step 1: Ket noi den MongoDB
mongoose
  .connect(ENV.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // step 2: Chạy hàm seed dữ liệu
    await fakeData();
    // Ngắt kết nối sau khi hoàn thành
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

const fakeData = async () => {
    try {
        console.log('Starting seed data...');

        // 1. Fake 5 brands
        for (let i = 1; i <= 5; i++) {
            const brandName = faker.company.name() + " " + i;
            const brand = new Brand({
                brand_name: brandName,
                description: faker.lorem.sentence(),
                slug: faker.helpers.slugify(brandName).toLowerCase(),
            });
            await brand.save();
            console.log(`Fake brand ${i} success`);
        }

        // 2. Fake 5 categories
        for (let i = 1; i <= 5; i++) {
            const categoryName = faker.commerce.department() + " " + i;
            const category = new Category({
                category_name: categoryName,
                description: faker.lorem.sentence(),
                slug: faker.helpers.slugify(categoryName).toLowerCase(),
            });
            await category.save();
            console.log(`Fake category ${i} success`);
        }

        // 3. Fake 30 products
        const currentBrands = await Brand.find();
        const currentCategories = await Category.find();

        for (let i = 1; i <= 30; i++) {
            const productName = faker.commerce.productName() + " " + i;
            const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
            const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

            if (!brand || !category) continue;

            const product = new Product({
                product_name: productName,
                price: Number(faker.commerce.price({ min: 100, max: 2000 })),
                discount: faker.number.int({ min: 0, max: 70 }),
                category: category._id,
                brand: brand._id,
                description: faker.commerce.productDescription(),
                model_year: faker.number.int({ min: 2020, max: 2024 }),
                stock: faker.number.int({ min: 0, max: 100 }),
                thumbnail: faker.image.url(),
                slug: faker.helpers.slugify(productName).toLowerCase(),
            });

            await product.save();
            console.log(`Fake product ${i} success`);
        }

        console.log('Seed data completed successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
