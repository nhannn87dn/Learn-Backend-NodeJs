import Category from '../../models/Category.model';

const getCategoryTree = async()=>{
    const categories = await Category
    .find()
    .select('category_name slug')
    //Để chắc ăn nên để limit 100
    .skip(0)
    .limit(100)
    return categories;
}

export default {
    getCategoryTree
}