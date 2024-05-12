// importing public packages
import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
//
import connectDB from "./configs/db.config.js";
// importing routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import fileRoutes from "./routes/file.routes.js";
//
import { errorHandler, notFound } from "./middlewares/error.middlewares.js";

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/files", fileRoutes)
// error middlewares
app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`.yellow.underline);
});