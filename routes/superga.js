import express from 'express'
import db from '../database/database.js'

const supergaRouter = express.Router()
supergaRouter.get('/brand/superga',(req,res)=>{
    const qHoka = `SELECT * FROM product WHERE brand_id = 7`
    db.query(qHoka,(error,data)=>{
        if(error) return res.status(400).json(error)
            const BASE_URL = 'http://localhost:3000/'
            const updatedData = data.map((dat)=>({
                ...dat,
                img:`${''}${dat.img}`
            }))
        return res.status(200).json(updatedData)
    })
})

export default supergaRouter