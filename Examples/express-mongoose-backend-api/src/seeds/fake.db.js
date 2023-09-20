const mongoose = require('mongoose');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const { Product } = require('../models/product.model');
const Customer = require('../models/customer.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Config = require('../models/config.model');
const PaymentMethod = require('../models/paymentMethod');
const ShippingMethod = require('../models/shippingMethod');
const buildSlug = require('../helpers/buildSlug');

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

  // Tạo các thông tin cấu hình cho cửa hàng
  const shopConfig = [
    {
      name: 'shop_name',
      value: 'My Online Store'
    },
    {
      name: 'seo_title',
      value: 'My Online Store - Your One Stop Shop for All Your Needs'
    },
    {
      name: 'seo_description',
      value: 'My Online Store offers a wide range of products at affordable prices. Shop now and enjoy free shipping on all orders.'
    },
    {
      name: 'hotline',
      value: '1800-1234'
    },
    {
      name: 'email',
      value: 'contact@myonlinestore.com'
    },
    {
      name: 'address',
      value: '123 Main Street, Anytown, USA'
    },
    {
      name: 'facebook_url',
      value: 'https://www.facebook.com/myonlinestore'
    },
    {
      name: 'twitter_url',
      value: 'https://twitter.com/myonlinestore'
    },
    {
      name: 'instagram_url',
      value: 'https://www.instagram.com/myonlinestore'
    },
    {
      name: 'working_hours',
      value: 'Monday - Friday: 9:00 AM - 5:00 PM'
    }
  ];

  // Lưu các thông tin cấu hình vào cơ sở dữ liệu
  await Config.create(shopConfig);

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
  console.log(`Create User Admin successfully !`);

  const customer_types = ['guest','normal', 'member', 'vip'];
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
    console.log(`Create Customer ${i} successfully !`);
  }

  // Tạo 10 thương hiệu
  for (let i = 1; i <= 10; i++) {
    let brandName = faker.company.name();
    const brand = new Brand({
      name: brandName,
      slug: buildSlug(brandName),
      description: `Description for brand ${i}`,
      image: `https://picsum.photos/200/200`,
    });
    await brand.save();
    console.log(`Create Brand ${i} successfully !`);
  }

  // Tạo 10 danh mục
  for (let i = 1; i <= 10; i++) {
    let categoryName = faker.commerce.department();
    const category =  new Category({
      name: categoryName + i,
      slug: buildSlug(categoryName + i),
      description: `Description for category ${i}`,
      image: `https://picsum.photos/200/200`,
    });
    await category.save();
    console.log(`Create Category ${i} successfully !`);
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
    const productImages = [];

    for (let j = 1; j <= 3; j++) {
      const review = {
        customerId: customer._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `This is review ${j} for product ${i}.`,
      };

      const productImage = {
        url: `https://picsum.photos/400/400`,
        alt: '',
        caption: '',
        position: i
      };

      reviews.push(review);
      productImages.push(productImage);
    }

    
    let productName = faker.commerce.productName();

    const product = new Product({
      name: productName,
      slug: buildSlug(productName),
      brandId: brand._id,
      category: category._id,
      price: 100 + i * 10,
      description: faker.commerce.productDescription(),
      rating: 4.5,
      stock: 50 + i * 5,
      discount: i * 5,
      reviews: reviews,
      thumbnail: `https://picsum.photos/200/200`,
      images: productImages,
    });
    await product.save();
    console.log(`Create Product ${i} successfully !`);
  }//end product


  // Tạo dữ liệu mẫu cho PaymentMethod
  const paymentMethods = [
    {
      name: 'COD',
      description: 'Thanh toán cho người giao hàng'
    },
    {
      name: 'PayPal',
      description: 'Pay with PayPal'
    },
    {
      name: 'Bank transfer',
      description: 'Pay with a bank transfer'
    }
  ];

  await PaymentMethod.create(paymentMethods);

  // Tạo dữ liệu mẫu cho ShippingMethod
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      description: 'Delivery in 3-5 business days',
      price: 10
    },
    {
      name: 'Express Shipping',
      description: 'Delivery in 1-2 business days',
      price: 25
    }
  ];

  await ShippingMethod.create(shippingMethods);
    

  /* Tạo Order */
  const products = await Product.find();
  const payment_Methods = await PaymentMethod.find();
  const shipping_Methods = await ShippingMethod.find();

  for (let i = 1; i <= 5; i++) {

    const product_random = products[Math.floor(Math.random() * products.length)];
    const paymentMethod = payment_Methods[Math.floor(Math.random() * payment_Methods.length)];
    const shippingMethod = shipping_Methods[Math.floor(Math.random() * shipping_Methods.length)];

    const productsArr = [];
    let total = 0;
    for (let j = 1; j <= 3; j++) {
      const product = {
        product: product_random._id,
        quantity: j,
        price: product_random.price,
        discount: product_random.discount,
      };
      
      total += product.price * product.quantity * (1 - product.discount / 100);

      productsArr.push(product);
    }

    // Lấy ngày giờ hiện tại
      const now = new Date();

      // shippedDate Cộng thêm 1 ngày
      const shippedDate = new Date();
      shippedDate.setDate(now.getDate() + 1);

      // deliveredDate Cộng thêm 3 ngày
      const deliveredDate = new Date();
      deliveredDate.setDate(now.getDate() + 2);

    
    const order =  new Order({
      code: faker.string.hexadecimal({ length: 10, casing: 'lower' }),
      user: customers[Math.floor(Math.random() * customers.length)]._id,
      products: productsArr,
      shippedDate: new Date(),
      deliveredDate: deliveredDate,
      paidDate: deliveredDate,
      paymentMethod: paymentMethod._id,
      shippingMethod: shippingMethod._id,
      status: 'pending',
      total: total,
      createdDate: now,

    });
    await order.save();
    console.log(`Create Order ${i} successfully !`);
  } //end order

  console.log('Data created successfully!');
}
console.log('Gen Data Test ....');
try {
  createData();
} catch (error) {
  console.log(error);
}

