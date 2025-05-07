import { Router } from "express";
import { passportCall } from "../middlewares/passport-call.js";
import { checkRole } from "../middlewares/check-role.js";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

router.get(
  "/",
  [passportCall("jwt", { session: false }), checkRole(["admin"])],
  cartController.getAll
);

router.get(
  "/:id",
  [passportCall("jwt", { session: false })],
  cartController.getById
);

router.post(
  "/",
  [passportCall("jwt", { session: false }), checkRole(["admin"])],
  cartController.create
);

router.put(
  "/:id",
  [passportCall("jwt", { session: false }), checkRole(["admin"])],
  cartController.update
);

router.delete(
  "/:id",
  [passportCall("jwt", { session: false }), checkRole(["admin"])],
  cartController.delete
);

router.post(
  "/products/:idProd",
  [passportCall("jwt", { session: false })],
  cartController.addProdToCart
);

router.delete(
  "/:idCart/products/:idProd",
  [passportCall("jwt", { session: false })],
  cartController.removeProdToCart
);

router.put(
  "/:idCart/products/:idProd",
  [passportCall("jwt", { session: false })],
  cartController.updateProdQuantityToCart
);

router.delete(
  "/clear/:idCart",
  [passportCall("jwt", { session: false })],
  cartController.clearCart
);

export default router;
