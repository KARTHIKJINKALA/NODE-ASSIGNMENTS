const mongoose=require("mongoose")
require("dotenv").config()

function  dbConnect(){
    mongoose.connect("mongodb+srv://karthikjinkala11:KarthikMango@cluster0.0a094.mongodb.net/Users").then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}
module.exports={dbConnect}
