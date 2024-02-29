console.log("ecom website")
const express=require("express")
const app=express();
const routes=require('./routes/user-route')
const mongoose=require("mongoose")
const protectedRoutes=require('./routes/protectedRoute')

mongoose.connect("mongodb+srv://abhishek:Abhibit1336@abhishek.pvc1ayt.mongodb.net/shop")
.then(()=>{
    console.log("db connect");
}).catch((err)=>{
    console.log(err)
})
app.use('',routes)



app.listen(8080,()=>{
    console.log("Server Started")
})
