import { Router } from "express";
import passport from "passport";
import { getCurrent } from "../controllers/userController.js";
import { resetPassword } from "../controllers/userController.js";

const router = Router();

router.get("/current", passport.authenticate("jwt", { session: false }), getCurrent);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
