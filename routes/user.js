import express from "express";
import db from "../database/database.js";

const femaleRoute = express.Router();
//show all products in the female
femaleRoute.get("/women", (req, res) => {
  const selectQuery = "SELECT * FROM product WHERE gender_id = 2";
  db.query(selectQuery, (error, data) => {
    if (error)
      return res.status(500).json({
        message: "Failed to collect data from database",
        error: error,
      });
    return res.status(200).json(data);
  });
});

// alow searching from women sections
femaleRoute.post("/women/search", (req, res) => {
  const { search } = req.body;
  if (!search) return res.status(400).json({ message: "missing fields" });
  // proceed  to seacrh for products
  const searchQuery = `SELECT * FROM product WHERE (Prod_name LIKE ? or brand_name LIKE ? ) AND gender_id = 1 And age_type_id = 1`;
  db.query(searchQuery,[`%${search}%`,`%${search}%`],(error,data)=>{
    if(error)return res.status(500).json(error)
    return res.status(200).json(data)
  })
});
export default femaleRoute;
