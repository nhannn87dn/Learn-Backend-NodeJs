import Product from "../../models/Product.model";

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

export default {
    getProductsByCategoryHome
};
