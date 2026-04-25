import { Request, Response } from "express";
import * as supplierService from "./supplier.service";
import {
  createSupplierSchema,
  supplierParamsSchema,
  updateSupplierSchema,
} from "./supplier.validation";
import asyncHandler from "../../utils/async.handler";
import { ApiResponse } from "../../utils/api.response";

// Create
export const createSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createSupplierSchema.parse(req.body);

    const supplier = await supplierService.createSupplier(parsed);

    return res
      .status(201)
      .json(new ApiResponse(201, supplier, "Supplier created successfully"));
  },
);

// Get All
export const getAllSuppliers = asyncHandler(
  async (req: Request, res: Response) => {
    const suppliers = await supplierService.getAllSuppliers();

    return res
      .status(200)
      .json(new ApiResponse(200, suppliers, "Suppliers fetched successfully"));
  },
);

// Get One
export const getSupplierById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = supplierParamsSchema.parse(req.params);

    const supplier = await supplierService.getSupplierById(id);

    return res
      .status(200)
      .json(new ApiResponse(200, supplier, "Supplier fetched successfully"));
  },
);

// Update
export const updateSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = supplierParamsSchema.parse(req.params);
    const parsed = updateSupplierSchema.parse(req.body);

    const supplier = await supplierService.updateSupplier(id, parsed);

    return res
      .status(200)
      .json(new ApiResponse(200, supplier, "Supplier updated successfully"));
  },
);

export const deleteSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = supplierParamsSchema.parse(req.params);

    await supplierService.deleteSupplier(id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Supplier deleted successfully"));
  },
);
