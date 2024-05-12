import asyncHandler from "express-async-handler";
import Product from "../models/product.models.js"

const createProduct = asyncHandler(async (req, res, next)=>{
    try {
        
        const {
            name, image, brand, category,description, price, countInStock
        } = req.body;

        if(!name || !image || !brand || !category || !description || !price || !countInStock){
            res.status(400)
            return next(new Error("Please provide all fields name, image, brand, category,description, price and countInStock"))
        }

        const newProduct = new Product({
            name, image, brand, category,description, price, countInStock, user: req.user._id
        })

        await newProduct.save();

        res.json({
            remark:"Product created"
        })

    } catch (error) {
        next(error)
    }
});

const getProducts = asyncHandler(async (req, res, next)=>{
    try {

        const pageSize = 3; 
        const page = Number(req.query.page) || 1;

        const filter = req.query.name
        ? {
            name: {
              $regex: req.query.name,
              $options: "i",
            },
          }
          : {};

        
        const count = await Product.countDocuments(filter);

        const products = await Product.find(filter).limit(pageSize).skip(pageSize * (page-1));

        res.json({products, totalRecords: count, totalPages: Math.ceil(count / pageSize) })
    } catch (error) {
        next(error)
    }
})

const getProductById = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404);
        return next(new Error("Product not found"));
      }
    } catch (error) {
      next(error)
    }
  });

export {createProduct,getProducts, getProductById}