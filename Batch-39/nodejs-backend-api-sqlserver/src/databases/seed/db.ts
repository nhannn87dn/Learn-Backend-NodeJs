//File này dùng để tạo dữ liệu cho database
import { myDataSource } from '../data-soucre';
//import {globalConfig} from '../../constants/configs'
import { faker } from '@faker-js/faker';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';


const brands = [
  {
      brand_name: "Trek",
      description: "High-quality bikes for all terrains",
      slug: "trek"
  },
  {
      brand_name: "Giant",
      description: "Specializing in road and mountain bikes",
      slug: "giant"
  },
  {
      brand_name: "Specialized",
      description: "Innovative designs for cycling enthusiasts",
      slug: "specialized"
  },
  {
      brand_name: "Cannondale",
      description: "Known for its performance-oriented bicycles",
      slug: "cannondale"
  },
  {
      brand_name: "Scott",
      description: "Offers a wide range of bicycles for various purposes",
      slug: "scott"
  }
];


const categoryRepository = myDataSource.getRepository(Category)
const brandRepository = myDataSource.getRepository(Brand)
const productRepository = myDataSource.getRepository(Product)


const runDB = async ()=>{
 
  console.log('runDB running....');
  //tạo mới 5 danh mục ngẫu nhiên

  for (let index = 1; index < 6; index++) {
    
    const category = categoryRepository.create({
      category_name: faker.commerce.department()+index,
      description: faker.lorem.words(50),
      slug: faker.lorem.slug()+index,
    });
    //Đến bước nó mới chính thức ghi xuống DB
    await categoryRepository.save(category);
    console.log('Tạo danh mục thành công....', index);
  }

  //Tạo brands từ mảng có sẵn
  await brandRepository.insert(brands)
  
 const currentBrands = await brandRepository.find();
 const currentCategories = await categoryRepository.find();

 
   for (let i = 1; i <= 15; i++) {

    let productName = faker.commerce.productName()+i;
    
    const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

  
   
    // const product = productRepository.create({
    //   product_name: productName,
    //   price: faker.commerce.price({ min: 100, max: 1200 }),
    //   discount: faker.number.int({ min: 1, max: 50 }),
    //   category: category.category_id,
    //   brandId: brand.brand_id,
    //   description: faker.commerce.productDescription(),
    //   model_year: faker.helpers.fromRegExp('2[0-9]{3}'),
    //   stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
    //   thumbnail: 'https://picsum.photos/400/400', // Thêm trường thumbnail
    //   slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    // });
    const product = new Product();
    product.product_name = productName;
    product.price = parseFloat(faker.commerce.price({ min: 100, max: 1200 }));
    product.discount = faker.number.int({ min: 1, max: 50 });
    product.category = category;
    product.brand = brand;
    product.description = faker.commerce.productDescription();
    product.model_year = parseInt(faker.helpers.fromRegExp('2[0-9]{3}')); 
    product.stock = faker.number.int({ min: 1, max: 200 });
    product.thumbnail = 'https://picsum.photos/400/400';
    product.slug = faker.helpers.slugify(productName);

    await productRepository.save(product);

    console.log(`Create Product ${i} successfully !`);
    
  }
}

  

try {
  myDataSource
  .initialize()
  .then(() => {
      console.log("Kết nối với SQL Server thành công !")
      //Khi khởi động SQL server thành công thì mới gọi hàm run DB để tạo fake data
      runDB()
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
  })

  
} catch (error) {
  console.log(error);
}