import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// importing routes
import homeRouter from "./routes/home.routes.js";
import userRouter from "./routes/user.routes.js";
import linkRouter from "./routes/link.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middlewares.js";

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors())

// routes
//app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/links", linkRouter);

// serving frontend
app.use("/", express.static("build"))

// error middlewares
app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.underline);
});
