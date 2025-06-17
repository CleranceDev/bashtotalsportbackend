import express from 'express';
import db from '../database/database.js';

const newEraRouter = express.Router();

newEraRouter.get('/brand/newERa', (req, res) => {
  const qNewEra = 'SELECT * FROM product WHERE brand_id = 5';
  db.query(qNewEra, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
});

export default newEraRouter;
