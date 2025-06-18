import express from 'express'
import  db from '../database/database.js'

const nikePg = express.Router()
nikePg.get('/brand/nike',(req,res)=>{
    const selectAllNike = `SELECT * FROM product WHERE brand_name = 'Nike'`
    db.query(selectAllNike,(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = process.env.BASE_URL
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${''}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
nikePg.post('/brand/nike/search',(req,res)=>{
    const {search} = req.body
    if(!search){
        return res.status(400).json(error)
    }
    const searchPuma = `SELECT * FROM product WHERE brand_name = 'Nike' AND (Prod_name LIKE ?)
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
export default nikePg