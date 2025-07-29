
import { faker } from '@faker-js/faker';


//step 2: Su dung cac model de ket noi den collection
const fakeData = async () => {

  //new fake 5 brand
  for (let index = 1; index <= 5; index++) {
    const brandName = faker.company.buzzNoun()+index;
    const brand = new Brand({
      brand_name: brandName,
      description: faker.company.catchPhrase(),
      slug: faker.helpers.slugify(brandName),
    });
    await brand.save();
    console.log('Fake brand is success', index);
    
  }

  // insert 5 fake categories
  for (let index = 1; index <= 5; index++) {
    //dien thoai
    const categoryName = faker.commerce.department()+index;
    const category = new Category({
      category_name: categoryName,
       description: faker.lorem.word(50),
       //dien-thoai
       slug: faker.helpers.slugify(categoryName),
    });
    await category.save();
    console.log('Fake categoryName is success', index);
    
  }

   const currentBrands = await Brand.find();
   const currentCategories = await Category.find();

     for (let i = 1; i <= 15; i++) {

    let productName = faker.commerce.productName()+i;
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

    const fakeProduct = {
      product_name: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category_id: category._id,
      brand_id: brand._id,
      description: faker.commerce.productDescription(),
      model_year: faker.number.int({ min: 1900, max: 2024 }),
      stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
      thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
      slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    }
   
    const product = new Product(fakeProduct);
    await product.save();
    console.log(`Create Product ${i} successfully !`);
    
  }
  
}

//chay
try {
  fakeData();
} catch (error) {
  console.log('<<=== 🚀 error ===>>',error);
}