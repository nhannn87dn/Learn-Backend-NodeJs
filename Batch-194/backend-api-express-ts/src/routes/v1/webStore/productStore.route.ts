import express, { Router } from "express";
import productsController from "../../../controllers/products.controller";
const router = express.Router() as Router;

//GET api/v1/web-store/product/home-products?limit=5
router.get('/home-products', productsController.getProductsByCategoryHome);
export default router;