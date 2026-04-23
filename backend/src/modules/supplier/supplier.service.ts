import prisma from "../../prisma/client";

// Create Supplier
export const createSupplier = async (data: {
  name: string;
  phone?: string;
  address?: string;
}) => {
  return prisma.supplier.create({
    data,
  });
};

// Get All Suppliers
export const getAllSuppliers = async () => {
  return prisma.supplier.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// Get Supplier By ID
export const getSupplierById = async (id: string) => {
  const supplier = await prisma.supplier.findUnique({
    where: { id },
  });

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  return supplier;
};

// Update Supplier
export const updateSupplier = async (
  id: string,
  data: {
    name?: string;
    phone?: string;
    address?: string;
  },
) => {
  // Check existence
  const existingSupplier = await prisma.supplier.findUnique({
    where: { id },
  });

  if (!existingSupplier) {
    throw new Error("Supplier not found");
  }

  const updatedSupplier = await prisma.supplier.update({
    where: { id },
    data,
  });

  return updatedSupplier;
};

// Delete Supplier
export const deleteSupplier = async (id: string) => {
  return prisma.supplier.delete({
    where: { id },
  });
};
