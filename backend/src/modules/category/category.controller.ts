import { Request, Response } from "express";
import * as categoryService from "./category.service";
import {
  categoryParamsSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

// Create
export const createCategory = async (req: Request, res: Response) => {
  const parsed = createCategorySchema.parse(req.body);

  const category = await categoryService.createCategory(parsed);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

// Get All
export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();

  res.json({
    success: true,
    data: categories,
  });
};

// Get One
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = categoryParamsSchema.parse(req.params);
  const category = await categoryService.getCategoryBid(id);

  res.json({
    success: true,
    data: category,
  });
};

// Update

export const updateCategory = async (req: Request, res: Response) => {
  const parsed = updateCategorySchema.parse(req.body);
  const { id } = categoryParamsSchema.parse(req.params);
  const category = await categoryService.updateCategory(id, parsed);

  res.json({
    success: true,
    message: "Category update",
    data: category,
  });
};

// Delete
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = categoryParamsSchema.parse(req.params);
  await categoryService.deleteCategory(id);

  res.json({
    success: true,
    message: "Category delete",
  });
};
