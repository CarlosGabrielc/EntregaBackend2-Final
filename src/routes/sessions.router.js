// src/routes/sessions.router.js
import { Router } from "express";
import passport from "passport";
import { generateToken, authToken } from "../utils/jwt.js";

const router = Router();

// Registro
router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), async (req, res) => {
  res.send({ status: "success", message: "User registered" });
});

// Login
router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), async (req, res) => {
  const user = req.user;
  const token = generateToken(user);
  res.send({ status: "success", token });
});

// Current (validar JWT)
router.get("/current", authToken, (req, res) => {
  res.send({ status: "success", payload: req.user });
});

export default router;
