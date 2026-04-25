import { Request, Response } from "express";
import * as categoryService from "./category.service";
import {
  categoryParamsSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";
import asyncHandler from "../../utils/async.handler";
import { ApiResponse } from "../../utils/api.response";

// Create
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createCategorySchema.parse(req.body);

    const category = await categoryService.createCategory(parsed);

    return res
      .status(201)
      .json(new ApiResponse(201, category, "Category created successfully"));
  },
);

// Get All
export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();

    return res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories fetched successfully"),
      );
  },
);
// Get One
export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = categoryParamsSchema.parse(req.params);
    const category = await categoryService.getCategoryBid(id);

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched successfully"));
  },
);

// Update

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = updateCategorySchema.parse(req.body);
    const { id } = categoryParamsSchema.parse(req.params);
    const category = await categoryService.updateCategory(id, parsed);

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Category updated successfully"));
  },
);

// Delete
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = categoryParamsSchema.parse(req.params);
    await categoryService.deleteCategory(id);

    return res.status(200).json(new ApiResponse(200, null, "Category deleted"));
  },
);
