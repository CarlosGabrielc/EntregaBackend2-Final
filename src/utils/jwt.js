// src/utils/jwt.js
import jwt from "jsonwebtoken";

const SECRET = "coderSecret"; // podés ponerlo en .env

export const generateToken = (user) => {
  return jwt.sign({ user }, SECRET, { expiresIn: "1h" });
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "Not authenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, credentials) => {
    if (err) return res.status(403).send({ error: "Invalid token" });
    req.user = credentials.user;
    next();
  });
};
