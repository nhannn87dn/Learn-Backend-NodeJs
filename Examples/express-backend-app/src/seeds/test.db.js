const mongoose = require('mongoose');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const { Product } = require('../models/product.model');
const Customer = require('../models/customer.model');
const User = require('../models/user.model');



const MONGO_CONNECT = `mongodb://localhost:27017/myEcommerce`;

console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));



const getProduct = async () => {

  const start1 = performance.now();

    const product = await  Product
    .find()
    // .populate({ path: 'images'})
    // .lean({ virtuals: true })
    // .exec();

    console.log('<<=== Product ===>>', product );
    

    const end1 = performance.now();
  console.log(`Plugin embed: ${end1 - start1} ms`);

};


getProduct();
