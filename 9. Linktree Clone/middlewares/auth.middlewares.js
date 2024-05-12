import jwt from 'jsonwebtoken';
import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";


const protect = asyncHandler(async (req, res, next)=>{
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
          ) {
       
              token = req.headers.authorization.split(' ')[1]
        
              const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
              req.user = await User.findById(decoded.id).select('-password')
        
              next()
           
          }
        
          if (!token) {
            res.status(401)
            const error = new Error('Not authorized, no token')
            next(error);
        }
    } catch (error) {
        next(error);
    }
})

export {protect}
