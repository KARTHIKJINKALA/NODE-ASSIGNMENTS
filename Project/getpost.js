const express=require("express")
const app=express()

const {dbConnect}=require("./Connect.js")
const { default: mongoose } = require("mongoose")

app.use(express.json())

dbConnect()
// creating the schema
// Schema is the blue print of the data in outr database
const userSchema=new mongoose.Schema({
    name:String,const express = require("express");
const app = express();

const { dbConnect } = require("./Connect.js");
const { default: mongoose } = require("mongoose");

app.use(express.json());

dbConnect();

// Creating the schema
// Schema is the blueprint of the data in our database
const userSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  present_age: Number,
  city: String, // Added city field
});

const userModel = mongoose.model("userdetails", userSchema);

const postsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const postModel = mongoose.model("posts", postsSchema);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = new postModel(req.body);
    await newPost.save();
    res.send("Data posted successfully");
  } catch (error) {
    next(error);
  }
});

app.post("/posts1", async (req, res) => {
  try {
    const post = await postModel.create(req.body);
    res.send("Posted successfully");
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.send("Data inserted successfully");
  } catch (error) {
    next(error);
  }
});

const port = 3006;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
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

// app.get("/users",async (req,res)=>{
//      let data= await userModel.find()
//      console.log(data)

// })

const port=3006
app.listen(port,()=>{
    console.log("Server has been started")
})


