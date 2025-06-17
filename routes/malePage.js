import express from "express";
import db from "../database/database.js";
import dotenv from 'dotenv'

dotenv.config()

const maleRoute = express.Router();
maleRoute.get("/men", (req, res) => {
  const selecltFemales =
    "SELECT * FROM product WHERE gender_id = 1 AND age_type_id = 1";
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
maleRoute.post('/men/search',(req,res)=>{
  const {search} = req.body
  if(!search){
    return res.status(400).json(error)
  }
  const searching = `SELECT * FROM product WHERE 
  (Prod_name LIKE ? or brand_name LIKE ?) AND gender_id = 1 AND age_type_id=1`
  db.query(searching,[`%${search}%`,`%${search}%`],(error,data)=>{
    if(error) return res.status(500).json(error)
    const BASE_URL = process.env.BASE_URL
    const updatedData = data.map((prod)=>({
      ...prod,
      img:`${''}${prod.img}`
    }))
    return res.status(200).json(updatedData)
  }) 
})
// add to orders
maleRoute.post('/cart',(req,res)=>{
  const {user_id,prod_id} = req.body
  if(!user_id||!prod_id){
    return res.status(400).json('all fields required')
  }
  const qCart ='INSERT INTO orders(`user_id`,`prod_id`) VALUES (?)'
  const values = [user_id,prod_id]
  db.query(qCart,[values],(error,data)=>{
    if(error) return res.status(400).json(error)
    return res.status(201).json(data)
  }) 
})
export default maleRoute;