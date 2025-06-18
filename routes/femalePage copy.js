import express from 'express'
import db from '../database/database.js'

const femaleRoute = express.Router()
//get all from the database
femaleRoute.get('/women',(req,res)=>{
const collectDataQuery = "SELECT * FROM product WHERE gender_id = 2 AND age_type_id = 1 "
db.query(collectDataQuery,(error,data)=>{
    if(error) return res.status(500).json(error) 
    const Base = 'http://localhost:3000/'
    const updatedDATA = data.map((prod)=>({
        ...data,
        img:`${''}${prod.img}`
    }))
    return res.status(200).json(updatedDATA)
})
})
//allow searching 
// femaleRoute.post('/women/search',(req,res)=>{
//     const {search} = req.body
//     if(!search){
//         return res.status(400).json('all inputs required')
//     }
//     // searching logic 
//     const searchQuery = `
//     SELECT * FROM 
//     product WHERE 
//     (Prod_name LIKE ? AND brand_name LIKE ?)`
//     db.query(searchQuery,[`%${search}%`,`%${search}%`],(error,data)=>{
//         if(error) return res.status(400).json(error)
//         const Base = 'http://localhost:3000/'
//         const updatedDATA = data.map((prod)=>({
//             ...data,
//             img:`${Base}${prod.img}`
//         }))
//         return res.status(200).json(updatedDATA)
//     })

// })

export default femaleRoute