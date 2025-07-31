import { faker } from '@faker-js/faker';
import { myDataSource } from '../data-soucre';
import { brandRepository } from '../repositories/brand.repository';
import { categoryRepository } from '../repositories/category.repository';
import { productRepository } from '../repositories/product.repository';



//step 2: Su dung cac model de ket noi den collection
const fakeData = async () => {

  //new fake 5 brand
  // for (let index = 1; index <= 5; index++) {
  //   const brandName = faker.company.buzzNoun()+index;
  //   const brand = brandRepository.create({
  //     brand_name: brandName,
  //     description: faker.company.catchPhrase(),
  //     slug: faker.helpers.slugify(brandName),
  //   });
  //   await brandRepository.save(brand);
  //   console.log('Fake brand is success', index);
    
  // }

  // insert 5 fake categories
  for (let index = 1; index <= 5; index++) {
    //dien thoai
    const categoryName = faker.commerce.department()+index;
    const category = categoryRepository.create({
      category_name: categoryName,
       description: faker.lorem.word(50),
       //dien-thoai
       slug: faker.helpers.slugify(categoryName).toLowerCase(),
    });
    await categoryRepository.save(category);
    console.log('Fake categoryName is success', index);
    
  }

   const currentBrands =  await brandRepository.find();
   const currentCategories =  await categoryRepository.find();

     for (let i = 1; i <= 15; i++) {

   
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

   let productName = faker.commerce.productName()+i;
   
    const product = productRepository.create({
      product_name: productName,
      price: Number(faker.commerce.price({ min: 100, max: 1200 })),
      discount: faker.number.int({ min: 1, max: 50 }),
      category: category,
      brand: brand,
      description: faker.commerce.productDescription(),
      model_year: faker.number.int({ min: 1900, max: 2024 }),
      stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
      thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
      slug: faker.helpers.slugify(productName).toLowerCase(), // Tạo slug từ productName
    });
    await productRepository.save(product);
    console.log(`Create Product ${i} successfully !`);
    
  }
  
}


myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        fakeData();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
})


