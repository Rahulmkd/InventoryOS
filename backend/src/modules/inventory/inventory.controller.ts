import { Request, Response } from "express";
import * as inventoryService from "./inventory.service";
import { stockInSchema, stockOutSchema } from "./inventory.validation";

// Stock IN
export const stockIn = async (req: Request, res: Response) => {
  const parsed = stockInSchema.parse(req.body);

  const result = await inventoryService.stockIn(parsed, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Stock added",
    data: result,
  });
};

// Stock OUT
export const stockOut = async (req: Request, res: Response) => {
  const parsed = stockOutSchema.parse(req.body);

  const result = await inventoryService.stockOut(parsed, req.user?.id);

  res.status(200).json({
    success: true,
    message: "Stock removed",
    data: result,
  });
};

// History
export const getTransactions = async (req: Request, res: Response) => {
  const data = await inventoryService.getTransactions();

  res.json({
    success: true,
    data,
  });
};
