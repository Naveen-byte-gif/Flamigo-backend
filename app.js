import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url"; // Import fileURLToPath
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); 


import orderRoutes from "./routes/orderRoutes.js"; 


const app = express();
app.use(express.json());


app.use("/api", express.static(path.join(__dirname)));
app.use(cors());
app.use("/orders", orderRoutes);


export default app;