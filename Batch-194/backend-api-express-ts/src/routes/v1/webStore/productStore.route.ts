import express, { Router } from "express";
import productsController from "../../../controllers/products.controller";
const router = express.Router() as Router;

//GET api/web-store/v1/products/home-products?limit=5
router.get('/home-products', productsController.getProductsByCategoryHome);
//GET api/web-store/v1/products/products-pagination?page=1&limit=10&cat_id=...&brand_id=...&isNew=true&keyword=...
router.get('/products-pagination', productsController.getProductsPagination);
//GET api/web-store/v1/products/product-details-slug/:slug
router.get('/product-details-slug/:slug', productsController.getProductDetailsBySlug);
export default router;