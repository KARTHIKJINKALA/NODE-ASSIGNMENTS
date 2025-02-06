const express=require("express")
const app=express()

const {dbConnect}=require("./Mongoose")
const { default: mongoose } = require("mongoose")

app.use(express.json())

dbConnect()
// console.log(dbConnect)
// creating the schema
// Schema is the blue print of the data in outr database

var userSchema=new mongoose.Schema({
    
id:Number,
jobrole:String,
companyname:String,
location:Array,
experience:String,
salary:String,
posted:String,
openings:Number,
jobdesc:String,
qualification:String,
industrytype:String,
employmenttype:Array ,
education:String,
skills:Array,
aboutcompany:String,
company_size:String,
applylink:String
})
const userModel=mongoose.model("Jobdetails",userSchema)


// app.get("/",(req,res)=>{
//     res.send("hello this is the Mongodb")
// })

app.get("/",async (req,res)=>{
     let data= await userModel.find()
     console.log(data)

})


const port=3008
app.listen(port,()=>{
    console.log("Server has been started")
})


