const express=require("express");
const Product =require('../models/product')

const bodyParser = require('body-parser');
const routes=express.Router();
routes.use(express.json());



const getProduct=async (req,res)=>{


    const newProduct = new Product(
        {
            productName:req.body.productName,
            brand:req.body.brand,
            size:req.body.size,
            mrp:req.body.mrp,
            price:req.body.price,
            discount:req.body.discount,
            rating:req.body.rating,
        }
    )
  try{
    const saveProduct =await newProduct.save();
    const products={
        productList:saveProduct
    }
    res.status(200).json(products)
  }
  catch(err){
    console.log(err)
  }
}

module.exports={getProduct}