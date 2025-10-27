import createError from 'http-errors';
import { IProductDTO } from "../types/products";
import Product from "../models/Product.model";

const findAll = async (query:any) => {
    //SELECT * FROM products
    // const products = await Product
    //     .find()
    //     .populate('category')
    //     .populate('brand');

    //SELECT c1, c2, ... FROM products 
    // JOIN categories ON products.category_id = categories.id 
    // JOIN brands ON products.brand_id = brands.id
    // const products = await Product
    //     .find() //cấu hình điều kiện where
    //     .select('product_name price') //cấu hình trường cần lấy hoặc loại bỏ
    //     .populate('category', '_id category_name') //join collection
    //     .populate('brand', '_id brand_name');

    //SELECT với WHERE
    // const category_id  = '68fb7ab3dbbe0847aa5ecae4';
    // const products = await Product
    //     .find({
    //         category: category_id,
    //         price: { $lt: 30000000 } //price < 30000000
    //     }) //cấu hình điều kiện where
    //     .select('product_name price') //cấu hình trường cần lấy hoặc loại bỏ
    //     .populate('category', '_id category_name') //join collection
    //     .populate('brand', '_id brand_name');
    

    //Lấy tất cả sản phẩm CÓ phân trang
    //Mặc định page=1, limit=1 nếu không có truyền vào
    const {page=1, limit=1} = query;
    const products = await Product
        .find() //cấu hình điều kiện where
        .select('product_name price') //cấu hình trường cần lấy hoặc loại bỏ
        .populate('category', '_id category_name') //join collection
        .populate('brand', '_id brand_name')
        //thuật toán phân trang
        .skip((page - 1) * limit) //bỏ qua bao nhiêu bản ghi
        .limit(limit);//lấy tối đa bao nhiêu bản ghi

    //lấy tổng số bản ghi của product
    const total = await Product.countDocuments();
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
