const express=require("express")
const app=express()

const {dbConnect}=require("./Connect.js")
const { default: mongoose } = require("mongoose")

app.use(express.json())

dbConnect()
// creating the schema
// Schema is the blue print of the data in outr database
const userSchema=new mongoose.Schema({
    name:String,
    salary:Number,
    present_age:Number
})
const userModel=mongoose.model("userdetails",userSchema)




const postsSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})
const postModel=mongoose.model("posts",postsSchema)

app.get("/posts",async(req,res)=>{
  try{
    let Out=await postModel.find()
    console.log(Out)
    res.send(Out)
  }
  catch(error){
    res.status(500).send(err)
  }

})

app.post("/posts",async(req,res)=>{
    console.log(req.body)

    let newPost=new postModel({
        "name":req.body.name,
        "age":req.body.age,
        "email":req.body.email
    })

    await newPost.save()
    res.send("data posted succesfully")

})

//we have the two method to insert the data into the mongodb one is save method and another one is create method

app.post("/posts1",async(req,res)=>{
    // console.log(req.body)
    let data=req.body
    console.log(data)

    let post=await postModel.create(data)
    res.send("posted succesfully")


})


app.post("/users",async(req,res)=>{
    console.log(req.body)

    let newUser= new userModel({
        "name":req.body.name,
        "salary":req.body.salary,
        "present_age":req.body.age,
        "city":req.body.city
    })

    await newUser.save()
    res.send("data inserted succesfully")
})

// app.get("/",(req,res)=>{
//     res.send("hello this is the Mongodb")
// })

app.get("/users",async (req,res)=>{
     let data= await userModel.find()
     console.log(data)

})

const port=3005
app.listen(port,()=>{
    console.log("Server has been started")
})


