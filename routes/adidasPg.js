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
            img:`${BASE_URL}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
// adidasPg.post('/brand/adidas/search',(req,res)=>{
//     const {search} = req.body
//     if(!search){
//         return res.status(400).json(error)
//     }
//     const searchPuma = `SELECT * FROM product WHERE brand_name = 'Adidas' AND (Prod_name LIKE ?)
//     `
//     db.query(searchPuma,[`%${search}%`,`%${search}%`],(error,data)=>{
//         if(error) return res.status(500).json(error)
//         const BASE_URL = process.env.BASE_URL
//         const updatedData = data.map((prod)=>({
//             ...prod,
//             img:`${BASE_URL}${prod.img}`
//         }))
//         return res.status(200).json(updatedData)
//     })
// })
export default adidasPg