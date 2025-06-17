import express from 'express'
import db from '../database/database.js'


const searchRoute = express.Router()
searchRoute.post('/search',(req,res)=>{
    const {search} = req.body
    if(!search){
        return res.status(400).json('empty filled')
    } 
    const selectQuery = `SELECT * FROM product WHERE brand_name = ?`
    db.query(selectQuery,[search],(error,data)=>{
        if(error) return res.status(400).json(error)
        const BASE = 'http://localhost:3000/'
        updatedData = data.map((prod)=>({
            ...prod,
            img:`${BASE}${prod.img}`
        }))
        return res.status(200).json(updatedData)
        
    })

})

export default searchRoute