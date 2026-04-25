import { Router } from "express";
import * as productController from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .post(authenticate, productController.createProduct)
  .get(authenticate, productController.getAllProducts);

router
  .route("/low-stock")
  .get(authenticate, productController.getLowStockProducts);

router
  .route("/:id")
  .get(authenticate, productController.getProductById)
  .put(authenticate, productController.updateProduct)
  .delete(authenticate, productController.deleteProduct);

export default router;
