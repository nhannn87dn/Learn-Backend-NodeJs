import express from "express";
import brandsController from "../../controllers/brands.controller";
const router = express.Router();

router.get("/brands", brandsController.findAll);
router.get("/brands/:id", brandsController.findById);
router.post("/brands", brandsController.create);
router.put("/brands/:id", brandsController.updateById);
router.delete("/brands/:id", brandsController.deleteById);

export default router;
