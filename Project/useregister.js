var express = require("express");
var app = express();
var cors = require("cors");
var { dbConnect } = require("./regmongo");
const { default: mongoose } = require("mongoose");
var jsonwebtoken = require("jsonwebtoken");
const { title } = require("process");

var seckey="bhfchyuwiucbaos1624u345"

app.use(cors());
app.use(express.json());

dbConnect();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const userModel = mongoose.model("useregister", userSchema);

const employeSchema=new mongoose.Schema({
    username:String,
    password:String,
    role:String
})

const empModel=mongoose.model("employedetails",employeSchema)

// app.get("/user",async(req,res)=>{

//     var out=await userModel.find()
//     console.log(out)

//     res.send(out)

// })

// before posting the data into the database i need to check the username from frontend and if there is any
// users already registered with that name ,if it is same name ,i dont register the user with data,if not
// username is not find ,then i will update the register details in the collection
app.post("/userdetails", async (req, res) => {
  console.log(req.body);

  // var out=await userModel.find()
  // console.log(out)
  try {
    var out1 = await userModel.findOne({ username: req.body.username });
    if (out1) {
      console.log("user already exist");
      res.send( "Username already exists" );
    } else {
      let newPost = new userModel({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      });
      await newPost.save();
      res.send( "Succesfully Register" );
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


app.post("/login",async(req,res)=>{
    // console.log(req.body)

    if(req.body.role=="applicant"){
    var out = await userModel.findOne({ username: req.body.username, password:req.body.password })
    console.log(out)

    if (!out) {
        return res.send({ message: "Invalid credentials" });
    }
    else{
         
    var token = jsonwebtoken.sign(
        {
          id:out._id,
        },
        seckey
      );
      // console.log("token application")
      // console.log(token);


      res.send({
        token:token,
        message:"Login succesfull",
        redirecturl:"/Applicant"
        
      })
    
    }

    // var id=out._id
    // toString()
    // console.log(id)
   

    }
          

    else if(req.body.role=="employe"){
        console.log("this is admin")
        console.log("adimn")
        var out1 = await empModel.findOne({username:req.body.username,password:req.body.password})
        console.log(out1)

        if (!out1) {
            return res.send({ message: "Invalid credentials" });
        }
        else{
            
            var token1 = jsonwebtoken.sign(
                {
                  id:out1._id,
                },
                seckey
              );
              // console.log("token1 employe")
              // console.log(token1);
    
              res.send({
                token:token1,
                message:"Login succesfull",
               redirecturl:"/Employe"

              })
        }

        
        }
        else{
            
               res.send("No employee with this username and password")
        }
 

})


app.post("/verify-token",(req,res)=>{
  const authHeader=req.headers.authorization
  console.log(authHeader)
  if(!authHeader){
    res.send({message:"No Token Priovided"})
  }

  try{
  const tokenverify=authHeader.split(" ")[1]
 
 
    var details = jsonwebtoken.verify(tokenverify, seckey);
    console.log(details);
    res.send({valid:true,message:"Valid token",det:details})
  }
  catch(error){
    res.send({valid:false,message:"Invalid token",error:error.message})

  }
  
})

const Jobschema=new mongoose.Schema({
  id:Number,
  title:String,
  description:String,
  companyname:String,
  openings:Number,
  salary:String,
  qualification:String,
  skills:Array,
  employmenttype:String,
  location:String,
  postdate:String,
  experience:String


})
// console.log(Jobschema)

const JobsModel=mongoose.model("jobs",Jobschema)


app.get("/jobs",async(req,res)=>{
  const response= await JobsModel.find()
  res.send(response)

})

var port = 3002;
app.listen(port, () => {
  console.log("server started");
});
