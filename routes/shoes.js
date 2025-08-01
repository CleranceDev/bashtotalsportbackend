import express from 'express'
import  db from '../database/database.js'

const shoes = express.Router()
shoes.get('/shoes',(req,res)=>{
    const selectALLadidas = `SELECT * FROM product WHERE sub_category_id = 5`
    db.query(selectALLadidas,(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = process.env.BASE_URL
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${''}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
shoes.post('/shoes/search',(req,res)=>{
    const {search} = req.body
    if(!search){
        return res.status(400).json(error)
    }
    const searchPuma = `SELECT * FROM product WHERE sub_category_id = 5 AND (Prod_name LIKE ?)
    `
    db.query(searchPuma,[`%${search}%`,`%${search}%`],(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = process.env.BASE_URL
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${''}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
export default shoes