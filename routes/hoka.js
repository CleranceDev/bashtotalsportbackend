import express from 'express'
import db from '../database/database.js'

const hokaRoute = express.Router()
hokaRoute.get('/brand/hoka',(req,res)=>{
    // const qHoka = `SELECT * FROM product WHERE brand_id = 4`
    const qHoka = `SELECT * FROM product  where Prod_name = 'Hoka Mens Clifton 10 Green Running Shoes'`
    db.query(qHoka,(error,data)=>{
        if(error) return res.status(400).json(error)
            const BASE_URL = ''
            const updatedData = data.map((dat)=>({
                ...dat,
                img:`${''}${dat.img}`
            }))
        return res.status(200).json(updatedData)
    })
})

export default hokaRoute