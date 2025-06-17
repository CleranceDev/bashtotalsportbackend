// orderController.js
import express from 'express'
import db from '../database/database.js'

const orderRoute = express.Router()

orderRoute.post('/order',(req,res)=>{
  const {user_id,prod_id,Price} = req.body
  if(!user_id||!prod_id||!Price){
    return res.status(400).json('missing inputs')
  }
  const qOrder = "INSERT INTO orders (`user_id`,`prod_id`,`Price`) VALUES (?,?,?)"
  const values = [user_id,prod_id,Price]
  db.query(qOrder,values,(error,data)=>{
    if(error) return res.status(400).json(error)
    return res.status(201).json(data)
  })

})

export default orderRoute

// exports.createOrder = async (req, res) => {
//   try {
//     const { prod_id, user_id, Price, total, quantity } = req.body;
    
//     // Validate required fields
//     if (!prod_id || !user_id || !Price || !total) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     // Insert order
//     const [result] = await db.execute(
//       `INSERT INTO orders 
//        (prod_id, user_id, Price, total, quantity) 
//        VALUES (?, ?, ?, ?, ?)`,
//       [prod_id, user_id, Price, total, quantity]
//     );

//     res.status(201).json({
//       success: true,
//       orderId: result.insertId,
//       message: 'Order created successfully'
//     });
//   } catch (error) {
//     console.error('Order creation error:', error);
//     res.status(500).json({ success: false, message: 'Failed to create order' });
//   }
// };

// exports.getUserOrders = async (req, res) => {
//   try {
//     const userId = req.params.userId;
    
//     const [orders] = await db.execute(
//       `SELECT o.*, p.Prod_name, p.img 
//        FROM orders o
//        JOIN products p ON o.prod_id = p.prod_id
//        WHERE user_id = ? 
//        ORDER BY o.created_at DESC`,
//       [userId]
//     );

//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error('Fetch orders error:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch orders' });
//   }
// };