import User from "../models/user.models.js";
import Order from "../models/order.models.js";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { ROLES } from "../utils/constants.js";

const registerUser = asyncHandler(async (req, res, next) => {
    try {

        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            res.status(400)
            next(new Error("Please provide all credentials"))
            return;
        };

        const userAlreadyExist = await User.findOne({ email });

        if (userAlreadyExist) {
            res.status(400)
            next(new Error("User with this email already exist!"));
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email, password: hashedPassword, name
        })

        await newUser.save()

        res.json({
            remark: "User created"
        })

    } catch (error) {
        next(error)
    }
})

const loginUser = asyncHandler(async (req, res, next) => {

    try {
        
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400)
            const error = new Error("Email or password not provided")
            next(error)
            return;
        };

        const user = await User.findOne({ email });

        if(!user){
            res.status(404);
            return next(new Error("User with this email does not exist"))
        }

        const isSamePassword = await bcryptjs.compare(password, user.password);

        if (!isSamePassword) {
            res.status(400)
            const error = new Error("Email or password is not valid")
            next(error)
            return;
        }

        const token = generateToken({
            id: user._id
        });

        res.json({
            remark: "login success",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        })


    } catch (error) {
        next(error)
    }
});

const getUserDetails = asyncHandler(async (req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        next(error)
    }
});

const updateUser = asyncHandler(async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);

        user.name = req.body.name || user.name;

        if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const token = generateToken({
            id: user._id
        });

        const updatedUser = await user.save();

        res.json({
            remark: "login success",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                token
            }
        });

    } catch (error) {
        next(error)
    }
})

const getUserOrders = asyncHandler(async (req, res, next)=>{
    try {
        const orders = await Order.find({user: req.params.userId});

        if(orders){
            res.json(orders);
        }else{
            res.status(404)
            return next(new Error("No orders to show"))
        }
    } catch (error) {
        next(error);
    }
})

export { registerUser, loginUser, getUserDetails, updateUser, getUserOrders }