import express from 'express'
import  db from '../database/database.js'

const techRoute = express.Router()
techRoute.get('/tech',(req,res)=>{
    const selectAlltec = `SELECT * FROM product WHERE sub_category_id = 6`
    db.query(selectAlltec,(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = process.env.BASE_URL
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${BASE_URL}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
techRoute.post('/tech/search',(req,res)=>{
    const {search} = req.body
    if(!search){
        return res.status(400).json(error)
    }
    const searchPuma = `SELECT * FROM product WHERE sub_category_id = 6 AND (Prod_name LIKE ?)
    `
    db.query(searchPuma,[`%${search}%`,`%${search}%`],(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = process.env.BASE_URL
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${BASE_URL}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
export default techRoute