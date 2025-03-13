import createError from 'http-errors';
import Product from '../models/product.model';

//Lấy danh sách sản phẩm theo slug của danh mục
const getProductsByCategorySlug = async(params:any, query:  any)=>{
    
    const categorySlug = params.slug;
    //page = query.page, nếu page không tồn tại thì mặc định là 1
  const { page = 1, limit = 10, sort_type = 'desc', sort_by='createdAt' } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>',sortObject);

    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.product_name && query.product_name.length > 0) {
        where = { ...where, product_name: { $regex: query.product_name, $options: 'i' } };
    }
    
    //Nếu tìm kiếm theo thương hiệu
    if (query.brand_id && query.brand_id.length > 0) {
        where = { ...where, brand_id: query.brand_id };
    }

    //Thêm các điều kiện khác nếu cần

  const products = await Product
  .find(where)
  .populate({
    path: 'category',
    //đi join với category tìm category có slug khớp
    match: {
        slug: categorySlug
    }
  })
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});

  //Đếm tổng số record hiện có của collection Product
   // Lọc ra các product mà có category không null (có kết quả phù hợp)
   const productsWithConditions = products.filter(p => p.category != null);

  const totalRecord = productsWithConditions.length;
  
  return {
    products: productsWithConditions,
    //Để phân trang
    pagination:{
        totalRecord,
        limit,
        page
    }
  };
}


// Lấy thông tin danh muc theo slug
const getProductBySlug = async(slug: string)=>{
    const product = await Product
    .findOne({
        slug
    })
    .select('-__v');
    return product
}

const getAll = async (query: any) => {

    //Lấy ra các tham số truyền vào
    //page = query.page, nếu page không tồn tại thì mặc định là 1
  const { page = 1, limit = 10, sort_type = 'desc', sort_by='createdAt' } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

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
    //Nếu tìm kiếm theo thương hiệu
    if (query.brand_id && query.brand_id.length > 0) {
        where = { ...where, brand_id: query.brand_id };
    }

    //Thêm các điều kiện khác nếu cần

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
    //Để phân trang
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
    await product.save(); //lưu lại vào db
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
    deleteById,
    getProductsByCategorySlug,
    getProductBySlug
}