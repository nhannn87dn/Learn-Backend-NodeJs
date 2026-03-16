
import { faker } from '@faker-js/faker';
import { myDataSource } from "../data-soucre";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Brand } from "../entities/brand.entity";


//step 1: Ket noi den MongoDB
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

//step 2: Fake data vao collection
const fakeData = async () => {
  //Your fake data logic here
  //tạo các repository để thao tác với database
    const brandRepository = myDataSource.getRepository(Brand);
    const categoryRepository = myDataSource.getRepository(Category);
    const productRepository = myDataSource.getRepository(Product);

  //new fake 5 brand
      for (let index = 1; index <= 5; index++) {
        const brandName = faker.company.buzzNoun()+index;
        
          const brand = brandRepository.create({
            brand_name: brandName,
            description: faker.company.catchPhrase(),
            slug: faker.helpers.slugify(brandName).toLocaleLowerCase(),
          });
          await brandRepository.save(brand);
        console.log('Fake brand is success', index);
        
      }


      // insert 5 fake categories
    for (let index = 1; index <= 5; index++) {
      //dien thoai
      const categoryName = faker.commerce.department()+index;
    
      const category = categoryRepository.create({
        category_name: categoryName,
         description: faker.lorem.word(10),
         slug: faker.helpers.slugify(categoryName).toLocaleLowerCase(),
      });
      await categoryRepository.save(category);
      console.log('Fake categoryName is success', index);
      
    }

    //fake 30 products
  //   const currentBrands = await Brand.find();
  //  const currentCategories = await Category.find();
    const currentBrands = await brandRepository.find();
    const currentCategories = await categoryRepository.find();

   console.log('<<=== 🚀 currentCategories ===>>',currentCategories);
   console.log('<<=== 🚀 currentBrands ===>>',currentBrands);

     for (let i = 1; i <= 30; i++) {

    let productName = faker.commerce.productName()+i;
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

    console.log('<<=== 🚀 brand ===>>',brand);
    console.log('<<=== 🚀 category ===>>',category);

    if(!brand || !category) {
      console.log('Brand or Category not found, skip creating product');
      break;
    }

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
      slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    });
    await productRepository.save(product);
    console.log(`Create Product ${i} successfully !`);
    
  }
};

fakeData(); //run