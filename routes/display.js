import express from "express";
import db from "../database/database.js";

const displayRoute = express.Router();
displayRoute.get("/display", (req, res) => {
  const qGetdisplay = `SELECT * FROM product WHERE brand_name = 'New Era' `;
  db.query(qGetdisplay, (error, data) => {
    if (error) return res.status(404).json(error);
    const BASE_URL = process.env.BASE_URL
    const updated = data.map((prod) => ({
        ...prod,
        img:`${BASE_URL}${prod.img}`
    }))
    return res.status(200).json(updated)
    ;
  });
});
export default displayRoute;
