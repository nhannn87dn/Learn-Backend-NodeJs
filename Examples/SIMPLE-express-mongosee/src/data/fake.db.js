const mongoose = require('mongoose');
const {Category, Employee, Customer,Order,Product,Supplier} = require('../models/index')

/* https://next.fakerjs.dev/ */
const { faker } = require('@faker-js/faker');

const MONGO_CONNECT = `mongodb://localhost:27017/myStore`;

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

  

  // Tạo 10 khách hàng ngẫu nhiên
  for (let i = 1; i <= 10; i++) {
    const customer = new Customer({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      password: 'password123',
      phoneNumber: faker.phone.number(),
      birthday: faker.date.anytime()
    });
    await customer.save();
    console.log(`Create Customer ${i} successfully !`);
  }

  // Tạo 10 employees ngẫu nhiên
  for (let i = 1; i <= 10; i++) {
    const employee = new Employee({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      password: 'password123',
      phoneNumber: faker.phone.number(),
      birthday: faker.date.anytime(),
      photo: ''
    });
    await employee.save();
    console.log(`Create Employee ${i} successfully !`);
  }

  // Tạo 10 nhà cung cấp
  for (let i = 1; i <= 10; i++) {
    let supplierName = faker.company.name() + ' 1';
    const supplier = new Supplier({
      name: supplierName,
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress()
    });
    await supplier.save();
    console.log(`Create Supplier ${i} successfully !`);
  }

  // Tạo 10 danh mục
  for (let i = 1; i <= 10; i++) {
    let categoryName = faker.commerce.department() + ` ${i}`;
    const category =  new Category({
      name: categoryName,
      description: `Description for category ${i}`
    });
    await category.save();
    console.log(`Create Category ${i} successfully !`);
  }


 

  // Tạo 10 sản phẩm, mỗi sản phẩm được gán ngẫu nhiên cho 1 thương hiệu và 1 danh mục
  const supplies = await Supplier.find();
  const categories = await Category.find();
 

  for (let i = 1; i <= 10; i++) {
    const supplier = supplies[Math.floor(Math.random() * supplies.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    let productName = faker.commerce.productName()+ ` ${i}`;

    const product = new Product({
      name: productName,
      supplier: supplier._id,
      category: category._id,
      price: 100 + i * 10,
      description: faker.commerce.productDescription(),
      rating: 4.5,
      stock: 50 + i * 5,
      discount: i * 5,
      thumbnail: `https://picsum.photos/200/200`,
    });
    await product.save();
    console.log(`Create Product ${i} successfully !`);
  }//end product

  /* Tạo Order */
  const products = await Product.find();
  const customers = await Customer.find();
  const employees = await Employee.find();
  const statuses = ['WAITING', 'COMPLETED', 'CANCEL'];
  const paymentTypes  = ['CASH', 'CREDIT CARD'];

  for (let i = 1; i <= 5; i++) {

    const product_random = products[Math.floor(Math.random() * products.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPaymentType = paymentTypes[Math.floor(Math.random() * paymentTypes.length)];
   
    const productsArr = [];
    for (let j = 1; j <= 3; j++) {
      const product = {
        product: product_random._id,
        quantity: j,
        price: product_random.price,
        discount: product_random.discount,
      };

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
      createdDate: now,
      shippedDate: new Date(),
      status: randomStatus,
      description: `Description for Order ${i}`,
      shippingAddress: customers[Math.floor(Math.random() * customers.length)].address,
      shippingCity: faker.location.city(),
      paymentType: randomPaymentType,
      customer: customers[Math.floor(Math.random() * customers.length)]._id,
      employee: employees[Math.floor(Math.random() * employees.length)]._id,
      orderDetail: productsArr


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

