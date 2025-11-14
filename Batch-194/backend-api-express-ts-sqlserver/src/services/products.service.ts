import createError from 'http-errors';
import {  IProductDTO } from "../types/products";
import {myDataSource} from '../data-soucre';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';

//Khởi tạo một repository cho entity Category
const categoryRepository = myDataSource.getRepository(Category);

//Khởi tạo một repository cho entity Product
const productRepository = myDataSource.getRepository(Product);

const findAll = async(query: any)=>{
    //SELECT * FROM products
    // const products = await productRepository.find();

    const {page=1, limit=10} = query;

    //Chỉ lấy trường cần thiết
    let filters = {};
    //filter theo category
    if(query?.cat_id && query.cat_id !== '') {
        filters = {
            ...filters,
            category: {
                id: parseInt(query.cat_id)
            }
        }
    }

    const [products, totalRecords] = await productRepository.findAndCount({
        where: {...filters},
        //chọn trường cần lấy
        select: {
            id: true,
            product_name: true,
            price: true,
            thumbnail: true,
            category: {
                category_name: true
            },
        },
        //join với bảng category để lấy tên category
        relations: {
            category: true,
        },
        //sắp xếp
        order: {
            id  : "DESC"
        },
        //phân trang
        skip: (page - 1) * limit,
        take: limit,
    });

 
    return {
        data: products,
        metadata: {
            page: parseInt(page as any),
            limit: parseInt(limit as any),
            totalRecords: totalRecords,
            totalPages: Math.ceil(totalRecords / parseInt(limit as any))
        }
    };
}

const findById = async({id}: {id: string}) =>{
    //SELECT * FROM products WHERE id = ?
    const product = await productRepository.findOneBy({id: parseInt(id)});
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!product) {
       throw createError(404, "Product not found")
    }
    return product
}


const create =async(productDto: IProductDTO)=>{
    //Tạo mới một record có quan hệ với category
    const category = await categoryRepository.findOneBy({id: productDto.category});
    if(!category){
        throw createError(400, "Category not found");
    }
    console.log('<<=== 🚀 productDto ===>>',productDto);
    const product = productRepository.create({
        product_name: productDto.product_name,
        description:  productDto.description,
        slug: productDto.slug,
        price: productDto.price,
        discount: productDto.discount,
        model_year: productDto.model_year,
        thumbnail: productDto.thumbnail,
        stock: productDto.stock,
        category: category,
    });
    
    const result = await productRepository.save(product);
    return result
}

const updateById =async({
    id,
    payload
}: {
    id: string,
    payload: Partial<IProductDTO>
})=>{
    //step1: Check xem trong db co ton tai record co id khong
    let product = await findById({id});
    if(!product){
        throw createError(404, "Product not found")
    }

    Object.assign(product, payload)

    //lưu lai
   const result =  await productRepository.save(product)

    //Lưu lại vào db
    //const result = await productRepository.update(product.id, payload);
    return result
}

const deleteById = async(id: string)=>{
    const product = await findById({id});
    if(!product){
        throw createError(404, "Product not found")
    }
    //step2: Xoa neu co ton tai
    await productRepository.delete(product.id);
    //Trả về product đã xóa
    return product;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}