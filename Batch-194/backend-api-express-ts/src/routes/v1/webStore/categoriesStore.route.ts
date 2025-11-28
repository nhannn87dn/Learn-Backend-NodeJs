import express, { Router } from "express";
import categoriesController from "../../../controllers/categories.controller";

const router = express.Router() as Router;

//GET api/v1/web-store/categories/tree ==> get category tree
router.get('/tree', categoriesController.getCategoryTree);

export default router;