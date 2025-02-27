import express from "express";
const router = express.Router();
import Product from "../../models/product.model";

// GET /api/v1/queries
router.get("/queries", async(req, res) => {
    console.log('queries');
    //1. find() -- lay du lieu tu collection
    // SQL: SELECT * FROM products
    // const products = await Product.find();
    // res.json(products);

    //2. findById - tim 1 theo id
    //SQL: SELECT * FROM product WHERE id = id

    // const product = await Product.findById('67b477ac754d958ca4f321b9');
    // res.json(product);

    // res.json({
    //     message: 'ok'
    // })

    //3 findOne - tim 1 record duy nhat
    //SQL - SELECT TOP 1 * FROM product WHERE model_year = 2357
    // const product = await Product.findOne({
    //     discount: 50
    // })
    // res.json(product);

    //4. Lấy những thuộc tính cần thiết
    //SQL: SELECT product_name, price, discount FROM product
    // const products = await Product
    // .find()
    // .select('product_name price discount')

    // res.json(products);

    //5. Lấy tất cả các trường ngoại trừ createAt, updateAt

    // const products = await Product
    // .find()
    // .select('-createdAt -updatedAt') // sử dụng dấu - để liệt trường ko muốn lấy

    // res.json(products);

    //6. Sắp xếp tăng giảm
    // const products = await Product
    // .find()
    // .select('-createdAt -updatedAt') // sử dụng dấu - để liệt trường ko muốn lấy
    // .sort({
    //     product_name: 1,// tăng giần
    //     price: -1, // giảm giần
    // })

    // res.json(products);

    //7. Tìm kiếm có điều kiện - WHERE
    //SQL: SELECT * FROM product WHERE model_year = xxxx
    // const products = await Product.find({
    //     //liet ke dieu kien = object
    //     model_year: 2856, // so sanh =
    // });
    // res.json(products)


    //8. Tim kiem voi so sanh >, <
    // const products = await Product.find({
    //     //liet ke dieu kien = object
    //     price: {$gt: 1000}, // >
    // });
    // res.json(products)

    //9. Tim kiem co su dung toan tu logic, and, or, in
    //SELECT * FROM product WHERE model_year = 2099 AND  stock = 198
    // const products = await Product.find({
    //     $and: [
    //         {model_year: 2099},
    //         {stock: 198}
    //     ]
    // });
    // res.json(products)

    //OR
    // const products = await Product.find({
    //     $or: [
    //         {model_year: 2099},
    //         {model_year: 198}
    //     ]
    // });
    // res.json(products)

    // TRUY VAN CAP NHAT - UPDATE
    //10. UPDATE product SET discount = 10 WHERE id = xxx
    // const result = await Product.findByIdAndUpdate('67b477ac754d958ca4f321c9', {
    //     discount: 10
    // },
    // {
    //     new: true, //tra ve result la du lieu da update
    // })
    // res.json(result)

    //11. UPDATE product SET discount = 10 WHERE model_year = xxx LIMIT 1

    // const result = await Product.findOneAndUpdate({
    //     model_year: 2099
    // }, {
    //     discount: 50
    // },
    // {
    //     new: true, //tra ve result la du lieu da update
    // })
    // res.json(result)

    //12 Lấy và phân trang
    // const currentPage = 1; //trang hiện tại
    // const pageSize = 10; // Số lượng items trên 1 trang

    // const product = await Product
    // .find()
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize)
    // res.json(product)

    //13. JOIN nhieu collection voi populate
    // const currentPage = 1; //trang hiện tại
    // const pageSize = 10; // Số lượng items trên 1 trang

    // const product = await Product
    // .find()
    // .populate('category', "category_name") //join voi categories collection
    // .populate('brand_id')
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize)
    // res.json(product)

    //14 Tim kiem voi toan tu LIKE

    const currentPage = 1; //trang hiện tại
    const pageSize = 10; // Số lượng items trên 1 trang

    const product = await Product
    .find({
        product_name: new RegExp(/Silk/, 'i') //ten sp co chua ki tu
    })
    .populate('category', "category_name") //join voi categories collection
    .populate('brand_id')
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)
    res.json(product)
});

export default router;