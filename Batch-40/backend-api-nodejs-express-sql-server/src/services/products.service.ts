import createError from 'http-errors';
import { buildSlug } from '../helpers/slugify.helper';
import { Product } from '../entities/product.entity';
import { myDataSource } from '../data-source';
import { MoreThan } from 'typeorm';

const productRepository = myDataSource.getRepository(Product);

const getAll = async (query: any) => {
    // 1. SELECT * FROM products
    //const products = await productRepository.find();

    // 2. SELECT product_name, price FROM products
    // const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true
    //     }
    // });

    // 3. SELECT * FROM products WHERE stock = 80
    // const products = await productRepository.find({
    //     where: {
    //         stock: 80
    //     }
    // });

    // 4. SELECT * FROM products WHERE price > 500
    // const products = await productRepository.findBy({
    //     price: MoreThan(500)
    // });

    // 5. SELECT * FROM products WHERE price > 500 ORDER BY price DESC
    //  const products = await productRepository.find({
    //     where: {
    //         price: MoreThan(500)
    //     },
    //     order: {
    //         price: 'DESC'
    //     }
    //  });

     // 6. JOIN với Category
     /* 
        SELECT p.*, c.category_name
        FROM products p
        JOIN categories c
        ON p.categoryId = c.Id

    */
     const [products, totalCount] = await productRepository.findAndCount({
        select: {
            id: true,
            product_name: true,
            price: true,
            discount: true,
            stock: true,
            category: {
                category_name: true
            },
            brand: {
                brand_name: true
            }
        },
         relations: {
            category: true,
            brand: true
         },
         order: {
             id: 'DESC'
         },
        skip: 0,
        take: 10
     });

    return {
        pagination: {
            total: totalCount,
            page: 1,
            limit: 10
        },
        products
    };
};

const getById = async(id: number) => {
    //check tồn tai id
    const category = await productRepository.findOne({
        select:{
            id: true,
            product_name: true,
            description: true,
            price: true,
            discount: true,
            stock: true,
            category: {
                category_name: true
            },
            brand: {
                brand_name: true
            }
        },
        where: {
            id
        }
    });
    if(!category){
        throw new createError.BadRequest('Product not found');
    }
    return category;
}
const create = async(payload: any) => {
    //check tồn tại tên
    const product = await productRepository.insert(payload);
    return product;
}

const updateById = async(id: number, payload: any) => {
    //Kiem tinh ton tai truoc
  const product = await getById(id);
  //Cap nhat merge objects
  Object.assign(product, payload);
  //save lai
  const updated = await productRepository.save(product)
  return updated
}

const deleteById = async(id: number) => {
    
    //Kiem tra tinh ton tai cua Id
  const product = await getById(id);
  //xoa
  await productRepository.delete({ 
    id: product.id 
  })
  return product
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}