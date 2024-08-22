import express, {NextFunction, Request, Response} from 'express'
import categoriesController from '../../controllers/categories.controller'
const router = express.Router();

import { Category } from '../../databases/entities/category.entity';
import { Brand } from '../../databases/entities/brand.entity';
import { Product } from '../../databases/entities/product.entity';
import { myDataSource } from '../../databases/data-soucre';
import { faker } from '@faker-js/faker';

const categoryRepository = myDataSource.getRepository(Category)
const brandRepository = myDataSource.getRepository(Brand)
const productRepository = myDataSource.getRepository(Product)

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


// Middleware cấp độ route
function middlewareCategories(req: Request, res: Response, next: NextFunction){
  console.log('Middleware 2');
  next();
}

function privateRoutegetAll(req: Request, res: Response, next: NextFunction){
  console.log('Middleware 3');
  next();
}

//Dùng cho tất cả các routes bên dưới
router.use(middlewareCategories)

//1. Get All Categories
//GET localhost:8080/api/v1/categories
router.get('', privateRoutegetAll, categoriesController.findAll)


// router.get('/seed', async (req, res, next)=>{

//   console.log('runDB running....');
//   //tạo mới 5 danh mục ngẫu nhiên

//   for (let index = 1; index < 6; index++) {
    
//     const category = categoryRepository.create({
//       category_name: faker.commerce.department()+index,
//       description: faker.lorem.words(50),
//       slug: faker.lorem.slug()+index,
//     });
//     //Đến bước nó mới chính thức ghi xuống DB
//     await categoryRepository.save(category);
//     console.log('Tạo danh mục thành công....', index);
//   }

//   //Tạo brands từ mảng có sẵn
//   await brandRepository.insert(brands)
  
//  const currentBrands = await brandRepository.find();
//  const currentCategories = await categoryRepository.find();

 
//    for (let i = 1; i <= 15; i++) {

//     let productName = faker.commerce.productName()+i;
    
//     const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
//     const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];

  
//     const product = new Product();
//     product.product_name = productName as string;
//     product.price = parseFloat(faker.commerce.price({ min: 100, max: 1200 }));
//     product.discount = faker.number.int({ min: 1, max: 50 });
//     product.category = category;
//     product.brand = brand;
//     product.description = faker.commerce.productDescription();
//     product.model_year = parseInt(faker.helpers.fromRegExp('2[0-9]{3}')); 
//     product.stock = faker.number.int({ min: 1, max: 200 });
//     product.thumbnail = 'https://picsum.photos/400/400';
//     product.slug = faker.helpers.slugify(productName);

//     await productRepository.save(product);
//     console.log(`Create Product ${i} successfully !`);
    
//   }

//   res.json({
//     done: 'ok'
//   })
// })

//2. Get One Category
//GET localhost:8080/api/v1/categories/:id
router.get('/:id', categoriesController.findById)


//3. Create a new category
//POST localhost:8080/api/v1/categories
router.post('', categoriesController.createRecord)

//4. Update a category
//PUT localhost:8080/api/v1/categories/:id
router.put('/:id', categoriesController.updateById)

//5. Delete a category
//DELETE localhost:8080/api/v1/categories/:id
router.delete('/:id', categoriesController.deleteById)


export default router