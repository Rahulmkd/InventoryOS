import { Router } from "express";
import * as categoryController from "./category.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .post(authenticate, categoryController.createCategory)
  .get(authenticate, categoryController.getAllCategories);

router
  .route("/:id")
  .get(authenticate, categoryController.getCategoryById)
  .put(authenticate, categoryController.updateCategory)
  .delete(authenticate, categoryController.deleteCategory);

export default router;
