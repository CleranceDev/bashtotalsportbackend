import express from 'express'
import db from '../database/database.js'

const hitech = express.Router()
hitech.get('/brand/hitec',(req,res)=>{
    const qHoka = `SELECT * FROM product WHERE brand_id = 9`
    db.query(qHoka,(error,data)=>{
        if(error) return res.status(400).json(error)
            const BASE_URL = 'http://localhost:3000/'
            const updatedData = data.map((dat)=>({
                ...dat,
                img:`${BASE_URL}${dat.img}`
            }))
        return res.status(200).json(updatedData)
    })
})

export default hitech