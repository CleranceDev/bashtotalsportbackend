import express from "express";
import db from "../database/database.js";

const authRoute = express.Router();
authRoute.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json("all fields are required");
  }
  //check user exist
  const checkEmailQ = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQ, [email], (error, datat) => {
    if (error) return res.status(500).json(error);
    if (datat.length > 0) return res.status(400).json("User already exist");

    //proceed to create a user
    const insertUserQ =
      "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, password];
    db.query(insertUserQ, [values], (error, data) => {
      if (error) return res.status(400).json(error);
      return res.status(201).json({ message: "user created", data });
    });
  });
});
//login
authRoute.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Enter email and password");
  }
  //login a user
  const selectQ = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [email, password];
  db.query(selectQ, values, (error, data) => {
    if (error) return res.status(400).json(error);
    if (data.length === 0)
      return res.status(400).json("Unauthorized user credidentals invalid");
    return res.status(200).json("User logged in ");
  });
});
authRoute.put("/update/:id", (req, res) => {
  
  const {username,password} = req.body
  if (!username || !password) {
    return res.status(400).json("Enter email, password and prod_id");
  }
  //update user
  const updateQ = "UPDATE users SET username = ? AND password = ?";
  const values = [username, password];
  db.query(updateQ,values,(error,data)=>{
    if(error) return res.status(400).json(error)
    return res.status(200).json({message:'username and password updated',data})
  })
});
export default authRoute;
