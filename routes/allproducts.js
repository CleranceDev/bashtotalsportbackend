import express from 'express'
import  db from '../database/database.js'

const allproductsRoute = express.Router()
allproductsRoute.get('/allproduct',(req,res)=>{
    const selectALLadidas = `SELECT * FROM product`
    db.query(selectALLadidas,(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = ''
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${''}${prod.img}`

        }))
        return res.status(200).json(updatedData)
    })
})
allproductsRoute.post('/allproduct/search',(req,res)=>{
    const {search} = req.body
    if(!search){
        return res.status(400).json(error)
    }
    const searchTerm = `%${search}`
    const searchPuma = `SELECT * FROM product WHERE (Prod_name LIKE ? OR brand_name LIKE ?)
    `
    db.query(searchPuma,[searchTerm,searchTerm],(error,data)=>{
        if(error) return res.status(500).json(error)
        const BASE_URL = ''
        const updatedData = data.map((prod)=>({
            ...prod,
            img:`${''}${prod.img}`
        }))
        return res.status(200).json(updatedData)
    })
})
export default allproductsRoute