import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { ENV } from "../config/env";
import Brand from "../models/brand.model";
import Category from "../models/category.model";
import Product from "../models/product.model";

const BRAND_COUNT = 5;
const CATEGORY_COUNT = 5;
const PRODUCT_COUNT = 30;

// Chuyển chuỗi thành slug: "Hello World" -> "hello-world"
const toSlug = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const seedBrands = async () => {
  // brand_name & slug là unique => sinh danh sách tên không trùng
  const names = faker.helpers.uniqueArray(() => faker.company.name(), BRAND_COUNT);
  const brands = names.map((name) => ({
    brand_name: name.slice(0, 50),
    description: faker.company.catchPhrase(),
    slug: toSlug(name).slice(0, 50),
  }));
  return Brand.insertMany(brands);
};

const seedCategories = async () => {
  const names = faker.helpers.uniqueArray(() => faker.commerce.department(), CATEGORY_COUNT);
  const categories = names.map((name) => ({
    category_name: name,
    description: faker.lorem.sentence(),
    slug: toSlug(name),
  }));
  return Category.insertMany(categories);
};

const seedProducts = async (
  brandIds: mongoose.Types.ObjectId[],
  categoryIds: mongoose.Types.ObjectId[],
) => {
  const names = faker.helpers.uniqueArray(() => faker.commerce.productName(), PRODUCT_COUNT);
  const products = names.map((name, index) => ({
    product_name: name,
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 2000 })),
    discount: faker.number.int({ min: 0, max: 70 }),
    model_year: faker.number.int({ min: 2015, max: 2026 }),
    stock: faker.number.int({ min: 0, max: 200 }),
    thumbnail: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    // thêm index để slug không bao giờ trùng
    slug: `${toSlug(name)}-${index + 1}`,
    brand: faker.helpers.arrayElement(brandIds),
    category: faker.helpers.arrayElement(categoryIds),
  }));
  return Product.insertMany(products);
};

const seed = async () => {
  await mongoose.connect(ENV.MONGODB_URI, {});
  console.log("✅[database]: Connected to MongoDB");

  // Xóa dữ liệu cũ của 3 collection để chạy lại nhiều lần không bị trùng unique
  await Promise.all([Product.deleteMany({}), Brand.deleteMany({}), Category.deleteMany({})]);
  console.log("🧹[seed]: Cleared products, brands, categories");

  const brands = await seedBrands();
  console.log(`🌱[seed]: Inserted ${brands.length} brands`);

  const categories = await seedCategories();
  console.log(`🌱[seed]: Inserted ${categories.length} categories`);

  const products = await seedProducts(
    brands.map((b) => b._id),
    categories.map((c) => c._id),
  );
  console.log(`🌱[seed]: Inserted ${products.length} products`);
};

seed()
  .catch((error) => {
    console.error("❌[seed]: Seeding failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
