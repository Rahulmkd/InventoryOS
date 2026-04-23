import prisma from "../../prisma/client";
import { StockInput } from "./inventory.types";

export const stockIn = async (data: StockInput, userId: string) => {
  const { productId, quantity, note } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Update product stock
    const product = await tx.product.update({
      where: { id: productId },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    // 2. Log transaction
    const transaction = await tx.inventoryTransaction.create({
      data: {
        productId,
        quantity,
        type: "IN",
        userId,
        note,
      },
    });

    return { product, transaction };
  });
};

export const stockOut = async (data: StockInput, userId: string) => {
  const { productId, quantity, note } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Get product
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // 2. Prevent negative stock
    if (product.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    // 3. Update stock
    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // 4. Log transaction
    const transaction = await tx.inventoryTransaction.create({
      data: {
        productId,
        quantity,
        type: "OUT",
        userId,
        note,
      },
    });

    return { product: updatedProduct, transaction };
  });
};
