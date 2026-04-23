import { Request, Response } from "express";
import * as supplierService from "./supplier.service";
import {
  createSupplierSchema,
  supplierParamsSchema,
  updateSupplierSchema,
} from "./supplier.validation";

// Create
export const createSupplier = async (req: Request, res: Response) => {
  const parsed = createSupplierSchema.parse(req.body);

  const supplier = await supplierService.createSupplier(parsed);

  res.status(201).json({
    success: true,
    message: "Supplier created successfully ",
    data: supplier,
  });
};

// Get All
export const getAllSuppliers = async (req: Request, res: Response) => {
  const supplier = await supplierService.getAllSuppliers();

  res.json({
    success: true,
    data: supplier,
  });
};

// Get One
export const getSupplierById = async (req: Request, res: Response) => {
  const { id } = supplierParamsSchema.parse(req.params);

  const supplier = await supplierService.getSupplierById(id);

  res.json({
    success: true,
    data: supplier,
  });
};

// Update
export const updateSupplier = async (req: Request, res: Response) => {
  const { id } = supplierParamsSchema.parse(req.params);

  const parsed = updateSupplierSchema.parse(req.body);
  const supplier = await supplierService.updateSupplier(id, parsed);

  res.json({
    success: true,
    message: "Supplier update",
    data: supplier,
  });
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = supplierParamsSchema.parse(req.params);

  await supplierService.deleteSupplier(id);

  res.json({
    success: true,
    message: "Supplier delete",
  });
};
