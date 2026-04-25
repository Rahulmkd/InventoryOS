import { Request, Response } from "express";
import * as productService from "./product.service";
import asyncHandler from "../../utils/async.handler";
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
} from "./product.validation";
import { ApiResponse } from "../../utils/api.response";

// Create
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createProductSchema.parse(req.body);

    const product = await productService.createProduct(parsed);

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created"));
  },
);

// Get All
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getAllProducts();

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Products fetched successfully"));
  },
);

// Get One
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = productParamsSchema.parse(req.params);

    const product = await productService.getProductById(id);

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product fetched successfully"));
  },
);

// Update
export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = productParamsSchema.parse(req.params);
    const parsed = updateProductSchema.parse(req.body);

    const product = await productService.updateProduct(id, parsed);

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  },
);

// Delete
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = productParamsSchema.parse(req.params);
    await productService.deleteProduct(id);

    return res.status(200).json(new ApiResponse(200, null, "Product deleted"));
  },
);

// Low Stock
export const getLowStockProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await productService.getLowStockProducts();

    return res
      .status(200)
      .json(new ApiResponse(200, products, "Low stock products fetched"));
  },
);
