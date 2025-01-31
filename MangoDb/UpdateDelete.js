const express=require("express")
const mongoose=require("mongoose")
const app=express()

const {dbConnect}=require("./Connect.js")
const { error } = require("console")

app.use(express.json())
dbConnect()

const userSchema=new mongoose.Schema({
    name:String,
    salary:Number,
    present_age:Number
},{strict:false})
// In Mongoose, the { strict: false } option in a schema means that Mongoose will allow
//  documents to store fields that are not explicitly defined in the schema.
const userModel=mongoose.model("userdetails",userSchema)


app.put("/users/:name",async(req,res)=>{
    // res.send("hello")
    console.log(req.params)
    let result=await userModel.updateOne({name:req.params.name},{salary:req.body.salary})
    if(result){
        res.send("Updated single one succesfully")
    }
    else{
        res.send("Not Updated")
    }

})

app.put("/users1/:age",async(req,res)=>{
console.log(req.params)
var result=await userModel.updateMany({present_age:req.params.age},req.body)
if(result){
    res.send(("Updated many succesfully"))
}
else{
    res.end(error.message)
}



// console.log(req.body)

})

const port=3006

app.listen(port,()=>{
    console.log("Server has been satrted succesfully")
})