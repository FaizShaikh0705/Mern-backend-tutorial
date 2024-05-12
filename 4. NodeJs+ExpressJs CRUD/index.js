// importing packages
import express from 'express';
import homeRouter from './routes/homeRouter.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors';

const app = express();

// middlewares
app.use(express.json())
app.use(cors())

// using routers
// http://localhost:5000/
app.use('/', homeRouter)

// http://localhost:5000/users/
app.use('/users', userRouter)

// starting our server
const PORT=5000
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
