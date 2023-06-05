const mongoose = require('mongoose');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const { Product, ProductImage } = require('../models/product.model');
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

  // const getGallery = async()=> {
  //   const productImage = await ProductImage.findById('6479a41c09802478c6472bb2');
  //   console.log(productImage);
  // };

  // getGallery();

const getProduct = async () => {
    const product = await  Product
    .find()
    .populate({ path: 'brandId'})
    // .lean({ virtuals: true })
    .exec();

    console.log('<<=== Product ===>>', product );
    
};
getProduct();