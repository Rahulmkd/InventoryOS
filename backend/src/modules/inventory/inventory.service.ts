import { TransactionType } from "@prisma/client";
import prisma from "../../prisma/client";

// STOCK IN (Purchase)
export const stockIn = async (
  data: {
    productId: string;
    quantity: number;
    note?: string;
  },
  userId?: string,
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Check product

    const product = await tx.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) throw new Error("Product not found");

    // 2. Update quantity
    const updatedProduct = await tx.product.update({
      where: { id: data.productId },
      data: {
        quantity: product.quantity + data.quantity,
      },
    });

    // 3. Create transaction record
    const transaction = await tx.inventoryTransaction.create({
      data: {
        type: TransactionType.IN,
        quantity: data.quantity,
        productId: data.productId,
        userId,
        note: data.note,
      },
    });

    // 4. Audit log
    await tx.auditLog.create({
      data: {
        userId,
        action: "STOCK_IN",
        tableName: "Product",
        recordId: data.productId,
        oldData: { quantity: product.quantity },
        newData: { quantity: updatedProduct.quantity },
      },
    });

    return { updatedProduct, transaction };
  });
};

//  STOCK OUT (Sale)
export const stockOut = async (
  data: {
    productId: string;
    quantity: number;
    note?: string;
  },
  userId?: string,
) => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) throw new Error("Product not found");

    // ! Prevent negative stock
    if (product.quantity < data.quantity) {
      throw new Error("Insufficient stock");
    }

    // Update quantity
    const updatedProduct = await tx.product.update({
      where: {
        id: data.productId,
      },
      data: {
        quantity: product.quantity - data.quantity,
      },
    });

    // Create transaction
    const transaction = await tx.inventoryTransaction.create({
      data: {
        type: TransactionType.OUT,
        quantity: data.quantity,
        productId: data.productId,
        userId,
        note: data.note,
      },
    });

    // Audit log
    await tx.auditLog.create({
      data: {
        userId,
        action: "STOCK_OUT",
        tableName: "Product",
        recordId: data.productId,
        oldData: { quantity: product.quantity },
        newData: { quantity: updatedProduct.quantity },
      },
    });

    return { updatedProduct, transaction };
  });
};

// Transaction History
export const getTransactions = async () => {
  return prisma.inventoryTransaction.findMany({
    include: {
      product: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
