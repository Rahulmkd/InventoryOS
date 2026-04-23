import { Router } from "express";
import * as categoryController from "./category.controller";

const router = Router();

router.post("/", categoryController.createCategory);

export default router;
