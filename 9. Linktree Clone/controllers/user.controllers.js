import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/helper.js";

const createUser = asyncHandler(async (req, res, next)=>{
    try {
        
        const {email, password, name, username} = req.body;

        if(!email || !password  || !name || !username){
            res.status(400)
            const error = new Error("Please provide all credentials")
            next(error)
            return;

        };

        const salt = await bcryptjs.genSalt(10);
        const encryptedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email, password: encryptedPassword, name, username
        })

        await newUser.save()

        res.json({
            remark: "User created"
        })

    } catch (error) {
        next(error)
    }
})

const userAuth = asyncHandler(async (req, res, next)=>{

    try {
        
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400)
            const error = new Error("Email or password not provided")
            next(error)
            return;
        };

        const user = await User.findOne({email});

        const isSamePassword = await bcryptjs.compare(password, user.password);

        if(!isSamePassword){
            res.status(400)
            const error = new Error("Email or password is not valid")
            next(error)
            return;
        }

        const token = generateToken({
            id: user._id,
            name: user.name
        });

        res.json({
            remark:"login success",
            data:{
                email: user.email,
                username: user.username,
                name: user.name,
                token
            }
        })


    } catch (error) {
        next(error)
    }
});

const isAuthenticated =(req, res, next)=>{
    res.json({
        remark:"You are logged in",
        data: req.user
    })
}

export {createUser, userAuth, isAuthenticated};