import asyncHandler from "express-async-handler";
import Product from "../models/product.models.js";
import Razorpay from "razorpay";
import {v4 as uuidv4} from "uuid";
import Order from "../models/order.models.js";
import crypto from "crypto";


const createOrder = asyncHandler(async(req, res, next)=>{
    try {
        
        const { products, shippingAddress } = req.body;

        if(
            !products ||
            !shippingAddress ||
            !shippingAddress.address ||
            !shippingAddress.city ||
            !shippingAddress.postalCode ||
            !shippingAddress.state
        ){
            return next(new Error("Not enough data to create an order"))
        }

        let totalPrice = 0;
        let orderItems = [];

        for(let i=0; i<products.length; i++){
            if(products[i]['productId'] && products[i]['qty']){
                const product = await Product.findById(products[i]['productId']);
                orderItems.push({productId: product._id, qty:products[i]['qty'], price: product.price });
                totalPrice+=product.price*products[i]['qty'];
            } else{
                return next(new Error("Atleast one product required to create an order"));
            }
        }

        var instance = new Razorpay({
            key_id: process.env.RZP_ID,
            key_secret: process.env.RZP_KEY,
        });

        const options =  {
            amount: Number(totalPrice)*100,
            currency: "INR",
            receipt: uuidv4()
        }

        instance.orders.create(options, async (err, order)=>{
            if(!err){
                
                const newOrder = new Order({
                    orderItems,
                    rzp_order_response: order,
                    user: req.user._id,
                    shippingAddress,
                    totalPrice: Number(totalPrice)
                })

                await newOrder.save();

                res.status(200).json({ order: newOrder, key: process.env.RZP_ID });

            } else{
                console.log("rzperror", err);
                return next(err);
            } 
        })


    } catch (error) {
        console.log("error", error);

        next(error)
    }
});


const getOrderById = asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.orderId)
  
      if (order) {
        res.json({ order, key: process.env.RZP_ID });
      } else {
        res.status(404);
        next(new Error("Order not found"));
      }
    } catch (error) {
      next(error);
    }
  });

  const verifyAndUpdateToPaid = asyncHandler(async (req, res, next) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;
  
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        res.status(400);
        return next(new Error("Not enough data to verify payment"));
      }
  
      const order = await Order.findById(req.params.orderId);
  
      if (!order || !order.user.equals(req.user._id)) {
        res.status(404);
        return next(new Error("Order not found"));
      }

      if(order.isPaid){
        res.status(400)
        return next(new Error("Already paid for this order"));
      }
  
      const sign = order.rzp_order_response.id + "|" + razorpay_payment_id;
  
      const expectedSign = crypto
        .createHmac("sha256", process.env.RZP_KEY)
        .update(sign.toString())
        .digest("hex");
  
      if (razorpay_signature === expectedSign) {
        order.rzp_payment_response = {
          rzpPaymentId: razorpay_payment_id,
          rzpSignature: razorpay_signature,
        };
        order.isPaid = true;
        order.paidAt = new Date();
  
        await order.save()
        return res.status(201).json({ remark: "Payment verified successfully" });
      } else {
        return res.status(400).json({ remark: "Invalid signature sent!" });
      }
    } catch (error) {
      next(error);
    }
  });

export {createOrder, getOrderById, verifyAndUpdateToPaid}