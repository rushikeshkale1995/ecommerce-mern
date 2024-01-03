import express from "express";
import color from "colors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'

const app = express();

// .env configration 
dotenv.config();

// database config 
connectDB();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)

app.use("/api/v1/product", productRoutes)


//rest api
app.get('/', (req, res) => {
    res.send({
        message: ("welcome to ecommerse app"),

    })
});
// 9767299199

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
