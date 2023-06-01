const mongoose = require('mongoose');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const { Product, Gallery } = require('../models/product.model');
const Customer = require('../models/customer.model');
const User = require('../models/user.model');

/* https://next.fakerjs.dev/ */
const { faker } = require('@faker-js/faker');

const MONGO_CONNECT = `mongodb://localhost:27017/myEcommerce`;

console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}

async function createData() {
  console.log(faker.person.firstName());

  await clearCollections();
  console.log('<<<< dropDatabase  >>>>');

  console.log('Begin building Data Test');

  // Create a new user with the generated password
  const user = new User({
    name: 'Administrator',
    email: 'root@example.com',
    password: 'Admin@123456',
    role: 'root',
    permissions: [],
    isEmailVerified: true,
  });
  await user.save();
  console.log(`Creat User Admin successfully !`);

  const customer_types = ['normal', 'member', 'vip'];
  // Tạo 10 khách hàng ngẫu nhiên
  for (let i = 1; i <= 10; i++) {
    const customer = new Customer({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      password: 'password123',
      type: customer_types[Math.floor(Math.random() * customer_types.length)],
    });
    await customer.save();
    console.log(`Creat Customer ${i} successfully !`);
  }

  // Tạo 10 thương hiệu
  for (let i = 1; i <= 10; i++) {
    const brand = new Brand({
      name: `Brand ${i}`,
      description: `Description for brand ${i}`,
      image: `https://example.com/brand${i}.jpg`,
    });
    await brand.save();
    console.log(`Creat Brand ${i} successfully !`);
  }

  // Tạo 10 danh mục
  for (let i = 1; i <= 10; i++) {
    const category = new Category({
      name: `Category ${i}`,
      description: `Description for category ${i}`,
      image: `https://example.com/category${i}.jpg`,
    });
    await category.save();
    console.log(`Creat Category ${i} successfully !`);
  }

  // Tạo 10 sản phẩm, mỗi sản phẩm được gán ngẫu nhiên cho 1 thương hiệu và 1 danh mục
  const brands = await Brand.find();
  const categories = await Category.find();
  const customers = await Customer.find();

  for (let i = 1; i <= 10; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];

    const reviews = [];
    for (let j = 1; j <= 3; j++) {
      const review = {
        customerId: customer._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `This is review ${j} for product ${i}.`,
      };
      reviews.push(review);
    }

    const product = new Product({
      name: `Product ${i}`,
      brand: brand._id,
      category: category._id,
      price: 100 + i * 10,
      description: `Description for product ${i}`,
      rating: 4.5,
      stock: 50 + i * 5,
      discount: i * 5,
      reviews: reviews,
    });
    await product.save();
    console.log(`Creat Product ${i} successfully !`);
  }

  // Tạo 10bộ sưu tập,  mỗi gallery gán ngẫu nhiên cho 1 sản phẩm
  const products = await Product.find();
  for (let i = 1; i <= 10; i++) {
    const product = products[Math.floor(Math.random() * products.length)];

    const gallery = new Gallery({
      productId: product._id,
      images: [
        { url: `https://picsum.photos/400/400` },
        { url: `https://picsum.photos/400/400` },
        { url: `https://picsum.photos/400/400` },
      ],
    });

    gallery.save();
    console.log(`Creat Gallery ${i} successfully !`);
  }
  console.log('Data created successfully!');
}

createData();
