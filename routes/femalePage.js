import express from "express";
import db from "../database/database.js";
import dotenv from 'dotenv'

dotenv.config()

const femaleRoute = express.Router();
femaleRoute.get("/women", (req, res) => {
  const selecltFemales =
    "SELECT * FROM product WHERE gender_id = 2 AND age_type_id = 1";
    db.query(selecltFemales,(error,data)=>{
      if(error) return res.status(500).json(error)
      const BASE_URL = process.env.BASE_URL
      const updatedData = data.map((prod)=>({
        ...prod,
        img:`${''}${prod.img}`
      }))
      return res.status(200).json(updatedData)
    })
});
femaleRoute.post('/women/search',(req,res)=>{
  const {search} = req.body
  if(!search){
    return res.status(400).json(error)
  }
  const searching = `SELECT * FROM product WHERE 
  (Prod_name LIKE ? or brand_name LIKE ?) AND gender_id = 2 AND age_type_id=1`
  db.query(searching,[`%${search}%`,`%${search}%`],(error,data)=>{
    if(error) return res.status(500).json(error)
    const BASE_URL = process.env.BASE_URL
    const updatedData = data.map((prod)=>({
      ...prod,
      img:`${BASE_URL}${prod.img}`
    }))
    return res.status(200).json(updatedData)
  }) 
})
export default femaleRoute;
