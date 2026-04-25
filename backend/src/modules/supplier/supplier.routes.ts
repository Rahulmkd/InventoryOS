import { Router } from "express";
import * as supplierController from "./supplier.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .post(authenticate, supplierController.createSupplier)
  .get(authenticate, supplierController.getAllSuppliers);

router
  .route("/:id")
  .get(authenticate, supplierController.getSupplierById)
  .put(authenticate, supplierController.updateSupplier)
  .delete(authenticate, supplierController.deleteSupplier);

export default router;
