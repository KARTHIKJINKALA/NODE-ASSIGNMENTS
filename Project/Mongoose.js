const mongoose=require("mongoose")
require("dotenv").config()

function  dbConnect(){
    mongoose.connect("mongodb+srv://Karthik:Karthik%4010@cluster0.j9m9i.mongodb.net/Jobs").then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}
module.exports={dbConnect}
