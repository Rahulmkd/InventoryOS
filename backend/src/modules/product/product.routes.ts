import { Router } from "express";
import * as productController from "./product.controller";

const router = Router();

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router.route("/low-stock").get(productController.getLowStockProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;


