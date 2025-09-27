// src/config/passport.config.js
import passport from "passport";
import local from "passport-local";
import User from "../models/User.js";
import { createHash, isValidPassword } from "../utils/utils.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use("register", new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return done(null, false, { message: "User already exists" });

        const newUser = new User({
          first_name,
          last_name,
          email,
          age,
          password: createHash(password)
        });
        const result = await newUser.save();
        return done(null, result);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.use("login", new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });
        if (!isValidPassword(user, password))
          return done(null, false, { message: "Incorrect password" });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};
