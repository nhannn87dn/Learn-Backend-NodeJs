import createError from 'http-errors';
import Product from '../models/product.model';

const getAll = async (query: any) => {

  const { page = 1, limit = 10 } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    const sortType = query.sort_type || 'desc';
    const sortBy = query.sort_by || 'createdAt';
    sortObject = { ...sortObject, [sortBy]: sortType === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>',sortObject);

    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.product_name && query.product_name.length > 0) {
        where = { ...where, product_name: { $regex: query.product_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }

  const products = await Product
  .find(where)
  .populate('category', 'category_name')
  .populate('brand_id', 'brand_name')
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});

  //Đếm tổng số record hiện có của collection Product
  const count = await Product.countDocuments(where);
  
  return {
    products,
    pagination:{
        totalRecord: count,
        limit,
        page
    }
  };
};

const getById = async(id: string) => {
    const product = await Product.findById(id);
    if (!product) {
        throw createError(400, 'Product not found');
    }
    return product;
}
const create = async(payload: any) => {
    //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
    const productExist = await Product.findOne({ product_name: payload.product_name });
    if (productExist) {
        throw createError(400, 'Product already exists');
    }

    //Tạo mới sản phẩm
    /**
     * Nên chi tiết các trường ra
     * để tránh client gửi lên và 
     * lưu trữ dữ liệu không mong muốn
     */

    console.log('<<=== 🚀 payload ===>>',payload);
    const product = new Product(payload);
    // const product = new Product({
    //     product_name: payload.product_name,
    //     price: payload.price,
    //     discount: payload.discount,
    //     description: payload.description,
    //     model_year: payload.model_year,
    //     stock: payload.stock,
    //     slug: payload.slug,
    //     thumbnail: payload.thumbnail,
    //     category: payload.category,
    //     brand_id: payload.brand_id,
    // });
    await product.save();
    return product;
}

const updateById = async(id: string, payload: any) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const product = await getById(id);

    /***
     * Kiểm tra xem tên sản phẩm bạn vừa đổi có khác với tên sản phẩm hiện tại không
     * Nếu khác thì kiểm tra xem có sản phẩm nào khác có tên giống không
     */
    if (payload.product_name !== product.product_name) {
        const productExist = await Product.findOne({ product_name: payload.product_name });
        if (productExist) {
            throw createError(400, 'Product already exists');
        }
    }
    //câp nhật sản phẩm
    Object.assign(product, payload); //trộn dữ liệu cũ và mới
    await product.save();
    return product;
}

const deleteById = async(id: string) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const product = await getById(id);
    //xóa sản phẩm
    await Product.deleteOne({ _id: product._id });
    return product;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}