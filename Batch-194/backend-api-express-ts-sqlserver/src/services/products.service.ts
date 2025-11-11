import createError from 'http-errors';
import { IProductDTO } from "../types/products";
import Product from "../models/Product.model";

const findAll = async (query:any) => {
   
    const {page=1, limit=10} = query;
    let where = {};
    //filter theo category
    if(query?.cat_id && query.cat_id !== '') {
        where = {
            ...where,
            category: query.cat_id
        }
    }
    //filter theo brand
    if(query?.brand_id && query.brand_id !== '') {
        where = {
            ...where,
            brand: query.brand_id
        }
    }
    //filter theo isNew
    if(query?.isNew && query.isNew !== '') {
        where = {
            ...where,
            isNew: query.isNew === 'true' ? true : false,
        }
    }
    //search theo product_name
    if(query?.keyword && query.keyword !== '') {
        where = {
            ...where,
            product_name: {
                $regex: query.keyword,
                $options: 'i'
            }
        }
    }

    /* Sort By and Sort Type */
    let sortObj: any = {};
    const sortBy = query?.sortBy || 'createdAt';
    const sortType = query?.sortType === 'desc' ? -1 : 1; // Mặc định là tăng dần
    sortObj[sortBy] = sortType;

    const products = await Product
        .find({...where}) //cấu hình điều kiện where
        .select('-__v') //cấu hình trường cần lấy hoặc loại bỏ
        .populate('category', '_id category_name') //join collection
        .populate('brand', '_id brand_name')
        //sắp xếp
        .sort(sortObj)
        //thuật toán phân trang
        .skip((page - 1) * limit) //bỏ qua bao nhiêu bản ghi
        .limit(limit);//lấy tối đa bao nhiêu bản ghi

    //lấy tổng số bản ghi của product
    const total = await Product.countDocuments({...where});
    return {
        items: products,
        pagination: {
            totalRecords: total,
            totalPage: Math.ceil(total/limit),
            currentPage: page,
            limit: Number(limit),
        }
    };
}

const findById = async ({ id }: { id: string }) => {
    //SELECT * FROM products WHERE id = ?
    const product = await Product.findById(id)
        // .populate('category')
        // .populate('brand');
    //Phải kiểm tra xem có tồn tại thật không. Nếu không thì trả về 404.
    if (!product) {
        throw createError(404, "Product not found")
    }
    return product
}


const create = async (productDto: IProductDTO) => {
    const product = new Product({
        product_name: productDto.product_name,
        description: productDto.description,
        slug: productDto.slug,
        price: productDto.price,
        discount: productDto.discount,
        modelYear: productDto.modelYear,
        thumbnail: productDto.thumbnail,
        stock: productDto.stock,
        category: productDto.category,
        brand: productDto.brand,
    });
    const result = await product.save();
    return result
}

const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<IProductDTO>
}) => {
    //step1: Check xem trong db co ton tai record co id khong
    let product = await findById({ id });
    if (!product) {
        throw createError(404, "Product not found")
    }

    //Step 2: Xử lý update khi có thay đổi
    Object.assign(product, payload);//merge 2 object lại với nhau

    //Lưu lại vào db
    await product.save();
    return product
}

const deleteById = async (id: string) => {
    const product = await findById({ id });
    if (!product) {
        throw createError(404, "Product not found")
    }
    //step2: Xoa neu co ton tai
    await Product.findByIdAndDelete(product._id);
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
