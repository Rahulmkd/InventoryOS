import { Request, Response } from "express";
import * as inventoryService from "./inventory.service";
import { stockSchema } from "./inventory.validation";
import { AuthRequest } from "../../middleware/auth.middleware";

export const stockIn = async (req: AuthRequest, res: Response) => {
  const data = stockSchema.parse(req.body);

  const result = await inventoryService.stockIn(data, req.user.userId);

  res.json({
    success: true,
    message: "Stock added successfully",
    data: result,
  });
};

export const stockOut = async (req: AuthRequest, res: Response) => {
  const data = stockSchema.parse(req.body);

  const result = await inventoryService.stockOut(data, req.user.userId);

  res.json({
    success: true,
    message: "Stock removed successfully",
    data: result,
  });
};
