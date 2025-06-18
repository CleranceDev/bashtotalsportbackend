import express from 'express'
import  db from '../database/database.js'

const adidasPg = express.Router()
adidasPg.get('/brand/adidas',(req,res)=>{
    const selectALLadidas = `SELECT * FROM product WHERE brand_name = 'Adidas'`
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
export default adidasPg