const express=require("express");
const User =require('../models/user')
const routes=express.Router();
const bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
routes.use(express.json());
routes.post('/add-user',async(request,response)=>{
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


}) 
routes.get('/add-user',async(request,response)=>{
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
}) 

routes.get('/get-user/:username',async(request,response)=>{
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
})

routes.get('/update-user/:username',async(request,response)=>{
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
})

routes.get('/delete-user/:username',async(request,response)=>{
    try{
        const updateusername = request.params.username;
        const name=request.body.name;
        const user = await User.findOne({ username: updateusername });
        if(!user){
            response.send("User Not Found")
        }
        user.username=name;
        const update= await User.deleteOne(user)
        response.status(200).json(update)
    }
    catch(err){
        console.log(err)
    }
})


module.exports=routes