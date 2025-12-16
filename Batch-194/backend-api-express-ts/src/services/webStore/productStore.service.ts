import Product from "../../models/Product.model";
import createError from 'http-errors';

const getProductsByCategoryHome = async ({
    categoryId,
    limit = 5
}: {
    categoryId: string;
    limit?: number;
}) => {
    const products = await Product
    .find({ category: categoryId })
    .select('product_name price thumbnail slug discount')
    .limit(limit);
    return products;
};


const getProductsPagination = async (query:any) => {
   
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

const getProductDetailsBySlug = async (slug: string | undefined) => {
    if(!slug) {
        throw  createError.BadRequest("Slug is required");
    }
    const product = await Product
        .findOne({slug})
        .select('-__v')
        .populate('category', '_id category_name') //join collection
        .populate('brand', '_id brand_name');
    return product;
}
export default {
    getProductsByCategoryHome,
    getProductsPagination,
    getProductDetailsBySlug
};
