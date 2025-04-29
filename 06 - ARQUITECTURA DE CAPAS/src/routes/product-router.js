import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
import { validatorParams } from "../middlewares/validators/product-validator.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", validatorParams, productController.getById);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;
