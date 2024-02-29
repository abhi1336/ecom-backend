
const express=require("express");
const User =require('../models/user')
const routes=express.Router();
const bodyParser = require('body-parser');
const jwt =require('jsonwebtoken')
var CryptoJS = require("crypto-js");
routes.use(express.json());
const verifyToken = require('../middleware/authMiddleware');
const secretKey = 'mahadev'



//all the method 
const addUser= async(request,response)=>{
    const newUser = new User(
        {
            username:request.body.username,
            password:CryptoJS.AES.encrypt(request.body.password, 'secret key 123').toString(),
            email:request.body.email,

        }
    );
    try{
        const saveUser= await newUser.save();
        response.status(200).json(saveUser)
    }
    catch(err){
        console.log(err)

    }
}

const getUser=async(request,response)=>{
    try{
        const username = request.params.username;
        const user = await User.findOne({ username: username });
        if(!user){
            response.send("User Not Found")
        }
        response.status(200).json(user)
    }
    catch(err){
        console.log(err)
    }
}

const updateUser=async(request,response)=>{
    try{
        const updateusername = request.params.username;
        const name=request.body.name;
        const user = await User.findOne({ username: updateusername });
        if(!user){
            response.send("User Not Found")
        }
        user.username=name;
        const update= await User.updateOne(user)
        response.status(200).json(update)
    }
    catch(err){
        console.log(err)
    }
}
const loginUser=async(req,res)=>{
    try{
      const {username}=req.body;
      const user=await User.findOne({username:username})
      if(!user){
        res.status(400).json({
            messageDesription:"User Not Found"
        })
      }
      user.password=CryptoJS.AES.decrypt(user.password, 'secret key 123').toString();
      console.log(user)
      const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        secretKey
    );
    const combinedData = {
        user: user,
        accessToken: accessToken
    }
    console.log('Token generated successfully:', accessToken);
      res.status(200).json(combinedData)
    }
    catch(err){
        res.status(500).json({
            messageDesription:"something went wrong"
        })
    }
}

const deleteUser=async(req, res) => {
    const username=req.params.username;
    console.log(username,"username")
    const user=await User.findOne({username:username})
    if(!user){
        res.status(403).json("User Not Found")
    }
    const update= await User.deleteOne(user)
    res.status(200).json(update)
    };

module.exports={addUser,getUser,updateUser,loginUser,deleteUser}