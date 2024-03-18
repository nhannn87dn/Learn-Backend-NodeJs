import { fakerVI as faker } from '@faker-js/faker'
import mongoose from "mongoose";
import Category from '../models/category.model';

const MONGO_CONNECT = `mongodb://localhost:27017/FakeDemo`;
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, mongooseDbOptions)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

  async function run(){
    //Tao categories
    for (let i = 0; i <= 5; i++){
        const categoryName = faker.commerce.department();
        const payloadCategories = {
            categoryName: categoryName,
            description: faker.commerce.productDescription(),
            slug: faker.helpers.slugify(categoryName),
        }
        const category = new Category(payloadCategories);
        await category.save();
        console.log('Created success category ',i);
    }
}
//CHẠY HÀM TẠO DATA TEST
console.log('Gen Data Test ....');
try {
  run();
} catch (error) {
  console.log(error);
}
