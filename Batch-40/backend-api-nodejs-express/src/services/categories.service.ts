import createError from 'http-errors';
import Category from '../models/category.model';
import { buildSlug } from '../helpers/slugify.helper';

// ==> PUBLIC ROUTES
const getCategoriesTree = async()=>{
    const categories = await Category
    .find()
    .select('-__v');
    return categories
}

// Lấy thông tin danh muc theo slug
const getCategoryBySlug = async(slug: string)=>{
    const category = await Category
    .findOne({
        slug
    })
    .select('-__v');
    return category
}




// ==> PRIVATE ROUTES
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
    if (query.category_name && query.category_name.length > 0) {
        where = { ...where, category_name: { $regex: query.category_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }

  const categories = await Category
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});

  //Đếm tổng số record hiện có của collection Category
  const count = await Category.countDocuments(where);
  
  return {
    categories,
    pagination:{
        totalRecord: count,
        limit,
        page
    }
  };
};

const getById = async(id: string) => {
    const category = await Category.findById(id);
    if (!category) {
        throw createError(400, 'Category not found');
    }
    return category;
}
const create = async(payload: any) => {
    //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
    const categoryExist = await Category.findOne({ category_name: payload.category_name });
    if (categoryExist) {
        throw createError(400, 'Category already exists');
    }

    //Tạo mới sản phẩm
    /**
     * Nên chi tiết các trường ra
     * để tránh client gửi lên và 
     * lưu trữ dữ liệu không mong muốn
     */

    console.log('<<=== 🚀 payload ===>>',payload);
    const category = new Category({
        category_name: payload.category_name,
        description: payload.description,
        slug: buildSlug(payload.category_name)
    });
    await category.save();
    return category;
}

const updateById = async(id: string, payload: any) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const category = await getById(id);

    /***
     * Kiểm tra xem tên sản phẩm bạn vừa đổi có khác với tên sản phẩm hiện tại không
     * Nếu khác thì kiểm tra xem có sản phẩm nào khác có tên giống không
     */
    if (payload.category_name !== category.category_name) {
        const categoryExist = await Category.findOne({ category_name: payload.category_name });
        if (categoryExist) {
            throw createError(400, 'Category already exists');
        }
    }
    //câp nhật category

    //cập nhật slug
    if(payload.category_name){
        payload.slug = buildSlug(payload.category_name);
    }

    Object.assign(category, payload); //trộn dữ liệu cũ và mới
    await category.save();
    return category;
}

const deleteById = async(id: string) => {
    //Kiểm tra xem sản phẩm có tồn tại không với id
    const category = await getById(id);
    //xóa sản phẩm
    await Category.deleteOne({ _id: category._id });
    return category;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getCategoriesTree,
    getCategoryBySlug
}