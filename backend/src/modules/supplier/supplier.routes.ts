import { Router } from "express";
import * as supplierController from "./supplier.controller";

const router = Router();

router
  .route("/")
  .post(supplierController.createSupplier)
  .get(supplierController.getAllSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplierById)
  .put(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

export default router;
