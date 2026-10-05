import Product from "../models/product.model";
import { ProductCreateDTO } from "../types/product";
import createError from "http-errors";

interface QueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    [key: string]: any; // Cho phép các tham số truy vấn khác
}

// Lấy tất cả sản phẩm (kèm thông tin brand & category)
const findAll = async (query: QueryParams) => {

    console.log('<<=== 🚀 query ===>>',query);
    const { page = 1, limit = 10, sortBy = "price", order = "desc", ...filters } = query;

    //filter by search keyword
    let where = {};
    if(filters.search && filters.search !== ''){
        where = {...where, product_name: { $regex: filters.search, $options: "i" } };
    }

    //filter by category
    if(filters.category && filters.category !== ''){
        where = {...where, category: filters.category };
    }

    //filter by brand
    if(filters.brand && filters.brand !== ''){
        where = {...where, brand: filters.brand };
    }

    //sắp xếp theo sortBy và order
    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions: { [key: string]: number } = {};
    sortOptions[sortBy] = sortOrder;

    //SELECT * FROM products
    //const products = await Product.find();
    //SELECT _id, product_name, price FROM products

    const products = await Product
    .find(
        //điều kiện where dạng object
        // {
        //     //model_year: { $eq: 2022}
        //     model_year: 2022,
        // }
       {
        ...where,
       }
    )
    .populate("brand", 'brand_name') // lấy thông tin brand_name và slug của brand
    .populate("category", 'category_name') // lấy thông tin category_name và slug của category
    //.select("_id product_name price") // chỉ lấy 3 trường _id, product_name, price
    .select('-updatedAt') // loại bỏ trường updatedAt khỏi kết quả truy vấn
    .sort(sortOptions) // sắp xếp theo sortBy và order
    .skip((page - 1) * limit) // bỏ qua (page - 1) * limit bản ghi
    .limit(limit); // chỉ lấy limit bản ghi
    
    const totalRecords = await Product.countDocuments({...where}); // đếm tổng số bản ghi thỏa mãn điều kiện filters

    //Cấu trúc dữ liệu trả về dành cho list có phân trang
    return {
        data: products,
        metadata: {
            page: Number(page),
            limit: Number(limit),
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
        }
    };
}

// Lấy sản phẩm theo ID
const findById = async (id: string) => {
    const product = await Product.findById(id)
        .populate("brand", "brand_name slug")
        .populate("category", "category_name slug");
    if (!product) {
        throw createError(404, "Product not found");
    }
    return product;
}

// Tạo sản phẩm mới
const create = async (payload: ProductCreateDTO) => {
    const newProduct = await Product.create(payload);
    return newProduct;
}

// Update sản phẩm theo ID
const updateById = async (id: string, payload: Partial<ProductCreateDTO>) => {
    const product = await findById(id);

    // Update the product with the new data
    Object.assign(product, payload);
    // Save the updated product
    await product.save();
    return product;
}

// Delete sản phẩm theo ID
const deleteById = async (id: string) => {
    const product = await findById(id);
    await Product.findByIdAndDelete(product._id);
    return product;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
