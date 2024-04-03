import { Product } from "./entities/Product.entity"
import { Category } from "./entities/Category.entity"
import { Brand } from "./entities/Brand.entity"
import { fakerVI as faker } from '@faker-js/faker'

import "reflect-metadata";
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mssql',
  host: 'PCNHAN',
  port: 1433,
  username: 'test',
  password: '123456789',
  database: 'Batch3738',
  entities: ['entities/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  options: {
    encrypt: false,
  },
});

myDataSource.initialize().then(() => {
    console.log("🚀[SQL Server] Data Source has been initialized!");

            
    const productRepository = myDataSource.getRepository(Product);
    const categoryRepository = myDataSource.getRepository(Category);
    const brandRepository = myDataSource.getRepository(Brand)


    //Tạo một hàm bất đồng bộ
    async function run(){
        //Tạo 5 Categories
        
        for (let index = 1; index < 5; index++) {
            const category = new Category();
            category.name= faker.commerce.department()
            category.description =faker.commerce.productDescription()
            const results = await categoryRepository.save(category)
            console.log('Tạo Category',index);
            
        }

        //Tạo 5 Brand
        
        for (let index = 1; index < 5; index++) {
            const brand = new Brand();
            brand.name = faker.vehicle.manufacturer(),
            brand.description = faker.commerce.productDescription()

            const results = await brandRepository.save(brand)
            console.log('Tạo Brand',index);
            
        }


        const currentBrands = await brandRepository.find();
        const currentCategories = await categoryRepository.find();
        
        //Tạo 10 product
        for (let index = 1; index < 10; index++) {
            const product = new Product();
            const brand = currentBrands[Math.floor(Math.random() * currentBrands.length)];
            const category = currentCategories[Math.floor(Math.random() * currentCategories.length)];
        

        
            product.name = faker.commerce.productName()
            product.price = faker.number.int({ min: 100, max: 1200 })
            product.discount =faker.number.int({ min: 1, max: 50 })
            product.stock = faker.number.int({ min: 1, max: 200 })
            product.brand = brand
            product.category = category
            product.description = faker.commerce.productDescription()
        
            const results = await productRepository.save(product);
            console.log('Tạo product',index);
            
        }
    }

    //CHẠY HÀM TẠO DATA TEST
    console.log('Gen Data Test ....');
    try {
    run();
    } catch (error) {
    console.log(error);
    }

})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
