// importing packages
import express from 'express';
import homeRouter from './routes/home.routes.js';
import cors from 'cors';
import colors from 'colors'
import connectDB from './config/db.js';
import noteRouter from './routes/note.routes.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express();

// middlewares
app.use(express.json())
app.use(cors())

// using routers
// http://localhost:5000/
app.use('/', homeRouter)

// http://localhost:5000/users
app.use('/notes', noteRouter)

// starting our server
const PORT=8000
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`.yellow.underline);
})