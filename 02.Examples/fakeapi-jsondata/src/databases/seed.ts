import { faker } from '@faker-js/faker';
import { writeFile } from '../helpers/fileHandler';
import path from 'path';

const BRAND_PATH = path.join(__dirname, 'brand.json');
const CATEGORY_PATH = path.join(__dirname, 'categories.json');
const PRODUCT_PATH = path.join(__dirname, 'product.json');

const fakeData = async () => {
  // Tạo 5 brand giả
  const brands = [];
  for (let index = 1; index <= 5; index++) {
    const brandName = faker.company.buzzNoun() + index;
    brands.push({
      id: index,
      brand_name: brandName,
      description: faker.company.catchPhrase(),
      slug: faker.helpers.slugify(brandName),
    });
  }
  await writeFile(BRAND_PATH, brands);
  console.log('Fake brands success!');

  // Tạo 5 category giả
  const categories = [];
  for (let index = 1; index <= 5; index++) {
    const categoryName = faker.commerce.department() + index;
    categories.push({
      id: index,
      category_name: categoryName,
      description: faker.lorem.words(10),
      slug: faker.helpers.slugify(categoryName),
    });
  }
  await writeFile(CATEGORY_PATH, categories);
  console.log('Fake categories success!');

  // Tạo 15 product giả
  const products = [];
  for (let i = 1; i <= 15; i++) {
    const productName = faker.commerce.productName() + i;
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    products.push({
      id: i,
      product_name: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category_id: category.id,
      brand_id: brand.id,
      description: faker.commerce.productDescription(),
      model_year: faker.number.int({ min: 1900, max: 2024 }),
      stock: faker.number.int({ min: 1, max: 200 }),
      thumbnail: 'https://picsum.photos/400/400',
      slug: faker.helpers.slugify(productName),
    });
  }
  await writeFile(PRODUCT_PATH, products);
  console.log('Fake products success!');
};

fakeData().catch((error) => {
  console.log('<<=== 🚀 error ===>>', error);
});