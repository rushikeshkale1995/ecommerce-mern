import express from "express";
import color from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();

// .env configration 
dotenv.config();

// database config 
connectDB();

// esmodule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './reactclient/build')))

// routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)

app.use("/api/v1/product", productRoutes)


//rest api
// app.get('/', (req, res) => {
//     res.send({
//         message: ("welcome to ecommerse app"),

//     })
// });

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./reactclient/build/index.html"));
});
// 9767299199

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
