import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProduct);
router.delete("/", productController.deleteProduct);
router.get("/:id", productController.getProductById);

router.put("/undo-delete", productController.undoDelete);
router.put("/:id", productController.updateProduct);

export const productRoutes = router;
