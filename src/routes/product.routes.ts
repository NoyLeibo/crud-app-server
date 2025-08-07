import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.put("/undo-delete", productController.undoDelete);
router.put("/:id", productController.updateProduct);

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.delete("/", productController.deleteProduct);

export const productRoutes = router;
