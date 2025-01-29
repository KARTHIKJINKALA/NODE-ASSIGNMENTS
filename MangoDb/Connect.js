const mongoose=require("mongoose")
require("dotenv").config()

function  dbConnect(){
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.0a094.mongodb.net/Project 0`).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}

module.exports={dbConnect}