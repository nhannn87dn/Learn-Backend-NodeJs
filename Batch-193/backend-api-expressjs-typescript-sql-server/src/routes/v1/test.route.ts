import express from "express";
import { productRepository } from "../../repositories/product.repository";
import { Like, MoreThan } from "typeorm";


const router = express.Router();



// Test route
router.get("/test", async (req, res) => {
    //1. SELECT *
    // const products = await productRepository.find();
    //2. select product_name, price from products
    // const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true
    //     }
    // });
    //3 With WHERE: select product_name, price, model_year from products where model_year=1998
    // const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true,
    //         model_year: true
    //     },
    //     where: {
    //         model_year: 1998
    //     }
    // });

    //4. Toan tu so sanh
    //select product_name, price, model_year from products where model_year> 1950
    // const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true,
    //         model_year: true
    //     },
    //     where: {
    //         model_year: MoreThan(1950)
    //     }
    // });
    //5. Toan tu LIKE

    // const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true,
    //         model_year: true
    //     },
    //     where: {
    //         product_name: Like('%Granite%')
    //     }
    // });
    //6. Sap xep order By
    //  const products = await productRepository.find({
    //     select: {
    //         product_name: true,
    //         price: true,
    //         model_year: true
    //     },
    //     order: {
    //         product_name: 'ASC',
    //         price: 'DESC' //gia tang dan
    //     }
    // });

    //7. Phan trang
    //  let {page = '1', limit='5'} = req.query;
    //  const products = await productRepository.find({
    //     select: {
    //         id: true,
    //         product_name: true,
    //         price: true,
    //         model_year: true
    //     },
    //     skip: (Number(page) - 1) * Number(limit), // vi bat dau lay
    //     take: Number(limit), // so luong can lay
    // });
    //9. JOIN voi category, brand
    // let {page = '1', limit='5'} = req.query;
    //  const products = await productRepository.find({
    //     select: {
    //         id: true,
    //         product_name: true,
    //         price: true,
    //         model_year: true,
    //         //Chi lay category_name o table category
    //         category: {
    //             category_name: true
    //         },
    //         brand: {
    //             brand_name: true
    //         }
    //     },
    //     relations: {
    //         category: true,
    //         brand: true
    //     },
    //     where: {
    //         model_year: MoreThan(1900)
    //     },
    //     skip: (Number(page) - 1) * Number(limit), // vi bat dau lay
    //     take: Number(limit), // so luong can lay
    // });
    // SELECT COUNT
    // const count = await productRepository.countBy({
    //         model_year: MoreThan(1900)
    //     })
    //10: Thực thi một SQL thuần
    // Dễ bị lỗi sql injection
    const products = await productRepository.query("SELECT * FROM products");
    res.json(products);
});

export default router;
