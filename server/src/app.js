import express from "express";
import apiRoute, { apiProtected } from "./utils/api.js";
import mongoose from "mongoose";
import { DB_CONNECT } from "./utils/constant.js";
import Authmiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';

const app = express();

mongoose.connect(DB_CONNECT,{useNewUrlParser:true},(e)=>console.log(e));

const PORT = 8000;

app.use(cors())
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', Authmiddleware,apiProtected);

app.listen(PORT,()=>console.log('server is running'))