import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import femaleRoute from "../routes/femalePage.js";
import maleRoute from "../routes/malePage.js";
import searchRoute from "../routes/searching.js";
import pumaPg from "../routes/pumaPg.js";
import adidasPg from "../routes/adidasPg.js";
import nikePg from "../routes/nike.js";
import shoes from "../routes/shoes.js";
import techRoute from "../routes/tech.js";
import createUsersRoute from "../routes/createUsers.js";
import orderRoute from "../routes/orderCart.js";
import hokaRoute from "../routes/hoka.js";
import newEraRouter from "../routes/newEra.js";
import newBalance from "../routes/newbalance.js";
import supergaRouter from "../routes/superga.js";
import hitech from "../routes/hitech.js";
import asicROute from "../routes/asic.js";
import underarmor from "../routes/underarmor.js";
import displayRoute from "../routes/display.js";
import allproductsRoute from "../routes/allproducts.js";
// import { uploadImages } from "./cloudnery.js";


dotenv.config();
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://bashtotalsport.netlify.app' 
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/home',femaleRoute)
app.use('/api/v1/home',maleRoute)
app.use('/api/v1/home',searchRoute)
app.use('/api/v1/home',pumaPg)
app.use('/api/v1/home',adidasPg)
app.use('/api/v1/home',nikePg)
app.use('/api/v1/home',newBalance)
app.use('/api/v1/home',supergaRouter)
app.use('/api/v1/home',hokaRoute)
app.use('/api/v1/home',hitech)
app.use('/api/v1/home',underarmor)
app.use('/api/v1/home',asicROute)
app.use('/api/v1/home',newEraRouter)
app.use('/api/v1/home',shoes)
app.use('/api/v1/home',techRoute)
app.use('/api/v1/home',createUsersRoute)
app.use('/api/v1/home',orderRoute)
app.use('/api/v1/home',displayRoute)
app.use('/api/v1/home',allproductsRoute)

// uploadImages()

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started running at ${PORT}`));
