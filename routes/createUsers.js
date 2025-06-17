import express from "express";
import db from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const createUsersRoute = express.Router();

// Register a new user
createUsersRoute.post("/user/register", async (req, res) => {
  const { username, lastname, email, password, phone, address } = req.body;
  if (!username || !lastname || !email || !password || !phone || !address) {
    return res.status(400).json("All fields are required");
  }

  try {
    const qCheckUser = "SELECT * FROM users WHERE email = ?";
    db.query(qCheckUser, [email], async (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length > 0) {
        return res.status(409).json("User already exists");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const qRegister = `
        INSERT INTO users (username, lastname, email, password, phone, address) 
        VALUES (?)
      `;
      const values = [username, lastname, email, hashPassword, phone, address];

      db.query(qRegister, [values], (error, data) => {
        if (error) return res.status(500).json(error);
        return res
          .status(201)
          .json({ user_id: data.insertId, username, lastname, email, phone,address });
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
});

// Login a user
createUsersRoute.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("all fields required");
  }

  try {
    const qEmailUser = "SELECT * FROM users WHERE email = ?";
    db.query(qEmailUser, [email], async (error, data) => {
      if (error) return res.status(500).json("internal error");
      if (data.length === 0) {
        return res.status(401).json("incorrect no email account");
      }

      const user = data[0];
      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching) {
        return res.status(401).json("incorrect password");
      }

      //Create JWT token
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      return res.status(200).json({
        token,
        user_id: user.user_id,
        username: user.username,
        lastname: user.lastname,
        phone: user.phone,
        address: user.address,
      });
    });
  } catch (error) {
    return res.status(500).json("internal error");
  }
});

export default createUsersRoute;
