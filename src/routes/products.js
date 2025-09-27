import { Router } from "express";
import passport from "passport";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

// Solo admins pueden crear, actualizar o eliminar productos
router.post("/", passport.authenticate("jwt", { session: false }), authorize(["admin"]), createProduct);
router.put("/:pid", passport.authenticate("jwt", { session: false }), authorize(["admin"]), updateProduct);
router.delete("/:pid", passport.authenticate("jwt", { session: false }), authorize(["admin"]), deleteProduct);

export default router;
