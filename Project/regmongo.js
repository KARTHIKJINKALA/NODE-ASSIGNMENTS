const mongoose=require("mongoose")
require("dotenv").config()

function  dbConnect(){
    mongoose.connect("mongodb+srv://karthikjinkala11:DYJZk8PQFp3wS69m@cluster0.y31rt.mongodb.net/Reactproject").then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}
module.exports={dbConnect}
