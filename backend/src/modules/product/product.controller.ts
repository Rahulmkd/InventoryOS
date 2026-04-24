import { Request, Response } from "express";
import * as productService from "./product.service";
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
} from "./product.validation";

// Create
export const createProduct = async (req: Request, res: Response) => {
  const parsed = createProductSchema.parse(req.body);

  const product = await productService.createProduct(parsed);

  res.status(201).json({
    success: true,
    message: "Product create",
    data: product,
  });
};

// Get All
export const getAllProducts = async (req: Request, res: Response) => {
  const product = await productService.getAllProducts();

  res.json({
    success: true,
    data: product,
  });
};

// Get One
export const getProductById = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params);

  const product = await productService.getProductById(id);

  res.json({
    success: true,
    data: product,
  });
};

// Update
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params);
  const parsed = updateProductSchema.parse(req.body);

  const product = await productService.updateProduct(id, parsed);

  res.json({
    success: true,
    message: "Product update",
    data: product,
  });
};

// Delete
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params);
  await productService.deleteProduct(id);

  res.json({
    success: true,
    message: "Product Delete",
  });
};

// Low Stock
export const getLowStockProducts = async (req: Request, res: Response) => {
  const product = await productService.getLowStockProducts();

  res.json({
    success: true,
    data: product,
  });
};
