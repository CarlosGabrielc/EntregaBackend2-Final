// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  role: { type: String, default: "user" },
  // Campos para recuperación de contraseña
  resetToken: { type: String },
  resetTokenExpiration: { type: Date }
});

export default mongoose.model("User", userSchema);
