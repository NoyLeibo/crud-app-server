import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProduct);
router.delete("/", productController.deleteProduct);
router.put("/:id", productController.updateProduct);
router.get("/:id", productController.getProductById);

export const productRoutes = router;
