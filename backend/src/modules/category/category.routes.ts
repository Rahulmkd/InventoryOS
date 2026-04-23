import { Router } from "express";
import * as categoryController from "./category.controller";

const router = Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
