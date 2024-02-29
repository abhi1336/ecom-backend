const express=require("express");
const User =require('../models/user')
const routes=express.Router();
const bodyParser = require('body-parser');
const jwt =require('jsonwebtoken')
var CryptoJS = require("crypto-js");
routes.use(express.json());
const verifyToken = require('../middleware/authMiddleware');
const secretKey = 'mahadev'
const controller =require("../controllers/user")

//user route 

routes.post('/add-user',controller.addUser);
routes.get('/get-user/:username',controller.getUser);
routes.get('/update-user/:username',controller.updateUser);
routes.post('/register',controller.loginUser);
routes.get('/delete/:username', verifyToken,controller.deleteUser )
routes.get('/delete/:username', verifyToken,controller.deleteUser )
    
module.exports=routes