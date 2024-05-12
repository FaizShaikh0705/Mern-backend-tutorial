import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// importing routes
import homeRouter from "./routes/home.routes.js";
import fileRouter from "./routes/files.routes.js"
import { errorHandler, notFound } from "./middlewares/error.middlewares.js";

dotenv.config();

connectDB();

const app = express();



// middlewares
app.use(cors())
app.use(express.json());

// routes
app.use("/", homeRouter);
app.use("/files", fileRouter)

// serving static files
app.use("/media", express.static("myFiles"))

// error middlewares
app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.underline);
});
