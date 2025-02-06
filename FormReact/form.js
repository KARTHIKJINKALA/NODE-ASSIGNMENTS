
var express=require("express")
var app=express()
var cors=require("cors")
var mongoose=require("mongoose")
var {dbConnect}=require("./connect")
console.log(dbConnect)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

dbConnect()
const userSchema=new mongoose.Schema({
   name:String,
   username:String,
   role:String
})
const userModel=mongoose.model("ReactWork",userSchema)



app.get("/users", async(req,res)=>{
//    console.log(req.body)
    let data=await userModel.find()
    console.log(data)
    res.send(data)

})

var port=3005
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})