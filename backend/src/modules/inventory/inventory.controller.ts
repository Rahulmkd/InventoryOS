import { Request, Response } from "express";
import * as inventoryService from "./inventory.service";
import { stockInSchema, stockOutSchema } from "./inventory.validation";
import asyncHandler from "../../utils/async.handler";
import { ApiResponse } from "../../utils/api.response";

// Stock IN
export const stockIn = asyncHandler(async (req: Request, res: Response) => {
  const parsed = stockInSchema.parse(req.body);

  const result = await inventoryService.stockIn(parsed, req.user?.id);

  return res.status(200).json(new ApiResponse(200, result, "Stock added"));
});

// Stock OUT
export const stockOut = asyncHandler(async (req: Request, res: Response) => {
  const parsed = stockOutSchema.parse(req.body);

  const result = await inventoryService.stockOut(parsed, req.user?.id);

  return res.status(200).json(new ApiResponse(200, result, "Stock removed"));
});

// History
export const getTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await inventoryService.getTransactions();

    return res.status(200).json(new ApiResponse(200, data));
  },
);
