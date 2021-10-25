import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

//--------------------------------------------------------
const router = Router();

// /api/auth/register

router.post(
  "/register",
  [
    check("email", "Not valid email").isEmail(),
    check("password", "Minimum 8 symbols are required").isLength({ min: 8 }),
  ],

  async function (req, res) {
    try {
      //inainte de a lucra cu datele care vin din frontend, trebuie sa validam datele. Pentru asta ne folosim de functia VALIDATIONRESULT(req)
      // daca folosim RETURN la un IF, atunci, in caz ca acest IF este afirmativ, scriptul (codul) mai departe nu merge. Adica nu se va indeplini logica codului dupa acest IF
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while registering a new user",
        });
      }
      //----------------------------------------------------------------------
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Sorry, such an user already exists" });
      }
      //folosind bcrypt noi codificiam parola, ca sa fie mai greu de furat. Pentru asta folosim metoda HASH( param1, param2). Param2 e o optiune speciala

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email: email, password: hashedPassword });
      await user.save();

      //raspundem la frontend. Code 201 inseamna ca ceva a fost creat cu succes
      res
        .status(201)
        .json({ message: "A new user has been successfully created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again!" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please write a correct email").normalizeEmail().isEmail(),
    check("password", "Write your password").exists(),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while login in",
        });
      }
      const { email, password } = req.body;

      const client = await User.findOne({ email: email });

      if (!client) {
        return res.status(400).json({ message: "Cannot find the user" });
      }
      const isPasswordMatching = await bcrypt.compare(
        password,
        client.password
      );

      if (!isPasswordMatching) {
        return res
          .status(400)
          .json({ message: "Incorrect password. Please try again!" });
      }

      const token = jwt.sign({ userId: client.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: client.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again!" });
    }
  }
);

export default router;
