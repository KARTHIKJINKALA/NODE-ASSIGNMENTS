var express = require("express");
var app = express();
var cors = require("cors");
const multer  = require('multer')


var { dbConnect } = require("./regmongo");
const { default: mongoose } = require("mongoose");
var jsonwebtoken = require("jsonwebtoken");
const { title } = require("process");
const { version } = require("os");

var seckey = "bhfchyuwiucbaos1624u345";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var storagedata=multer.diskStorage({
  destination:(req,file,cb)=>{
         cb(null,"./files")
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now()+file.originalname)
  }
})

var upload=multer({storage:storagedata})


dbConnect();

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    name: String,
    gender:String,
    email: String,
    mobile:String,
    resume:String,
    skills:String,
    experience:String
    
  },
  { strict: false }
);

const userModel = mongoose.model("useregister", userSchema);

const employeSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,

});

const empModel = mongoose.model("employedetails", employeSchema);

// app.get("/user",async(req,res)=>{

//     var out=await userModel.find()
//     console.log(out)

//     res.send(out)

// })

// before posting the data into the database i need to check the username from frontend and if there is any
// users already registered with that name ,if it is same name ,i dont register the user with data,if not
// username is not find ,then i will update the register details in the collection
app.post("/userdetails", async (req, res) => {
  // console.log(req.body);

  // var out=await userModel.find()
  // console.log(out)
  try {
    var out1 = await userModel.findOne({ username: req.body.username });
    if (out1) {
      console.log("user already exist");
      res.send("Username already exists");
    } else {
      let newPost = new userModel({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        gender:req.body.gender
      });
      await newPost.save();
      res.send("Succesfully Register");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  // console.log(req.body)

  if (req.body.role == "applicant") {
    var out = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    // console.log(out);

    if (!out) {
      return res.send({ message: "Invalid credentials" });
    } else {
      var token = jsonwebtoken.sign(
        {
          id: out._id,
        },
        seckey
      );
      // console.log("token application")
      // console.log(token);

      res.send({
        token: token,
        message: "Login succesfull",
        redirecturl: "/Applicant",
      });
    }

    // var id=out._id
    // toString()
    // console.log(id)
  } else if (req.body.role == "employe") {
    // console.log("this is admin");
    // console.log("adimn");
    var out1 = await empModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    // console.log(out1);

    if (!out1) {
      return res.send({ message: "Invalid credentials" });
    } else {
      var token1 = jsonwebtoken.sign(
        {
          id: out1._id,
        },
        seckey
      );
      // console.log("token1 employe")
      // console.log(token1);

      res.send({
        token: token1,
        message: "Login succesfull",
        redirecturl: "/Employe",
      });
    }
  } else {
    res.send("No employee with this username and password");
  }
});

app.post("/verify-token", (req, res) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    res.send({ message: "No Token Priovided" });
  }

  try {
    const tokenverify = authHeader.split(" ")[1];

    var details = jsonwebtoken.verify(tokenverify, seckey);
    console.log(details);
    res.send({ valid: true, message: "Valid token", det: details });
  } catch (error) {
    res.send({ valid: false, message: "Invalid token", error: error.message });
  }
});

const Jobschema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  companyname: String,
  openings: Number,
  salary: String,
  qualification: String,
  skills: Array,
  employmenttype: String,
  location: String,
  postdate: String,
  experience: String,
});
// console.log(Jobschema)

const JobsModel = mongoose.model("jobs", Jobschema);
console.log("Server started on port 3002");
console.log("Database connection established");
console.log("User model created");
console.log("Employee model created");
console.log("Jobs model created");
console.log("Server listening for incoming requests");

app.get("/jobsdata", async (req, res) => {
  const response = await JobsModel.find();
  res.send(response);
  // console.log(response);
});

app.put("/savedjobs", async (req, res) => {
  try {
    // console.log(req.body);

    var verifyuser = jsonwebtoken.verify(req.body.token, seckey);
    const match = verifyuser.id;
    console.log("Matched User ID:", match);

    let user = await userModel.findOne({ _id: match });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedjobindex || !Array.isArray(user.savedjobindex)) {
      user.savedjobindex = [];
    }

    console.log("Existing saved jobs:", user.savedjobindex);

    if (!user.savedjobindex.includes(req.body.savedjobindex)) {
      user.savedjobindex.push(req.body.savedjobindex);
    }

    console.log("Updated saved jobs:", user.savedjobindex);

    const savedupdate = await userModel.updateOne(
      { _id: match },
      { $set: { savedjobindex: user.savedjobindex } }
    );

    console.log("Database update result:", savedupdate);

    return res.json({
      message: "Saved jobs updated successfully!",
      savedjobindex: user.savedjobindex,
    });
  } catch (error) {
    console.error("Error updating saved jobs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/savedjobs", async (req, res) => {
  try {
    // console.log(req.body);

    // Verify the user using JWT
    var verifyuser = jsonwebtoken.verify(req.body.token, seckey);
    const match = verifyuser.id;
    // console.log("Matched User ID:", match);

    // Find the user in MongoDB
    let user = await userModel.findOne({ _id: match });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure savedjobindex exists and is an array
    if (!user.savedjobindex || !Array.isArray(user.savedjobindex)) {
      return res.status(400).json({ message: "No saved jobs found." });
    }

    console.log("Existing saved jobs before removal:", user.savedjobindex);

    // Remove the job index from savedjobindex array
    const updatedJobs = user.savedjobindex.filter(
      (job) => job !== req.body.savedjobindex
    );

    console.log("Updated saved jobs after removal:", updatedJobs);

    const savedupdate = await userModel.updateOne(
      { _id: match },
      { $set: { savedjobindex: updatedJobs } }
    );

    console.log("Database update result:", savedupdate);

    return res.json({
      message: "Job removed successfully!",
      savedjobindex: updatedJobs,
    });
  } catch (error) {
    console.error("Error removing saved job:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// function verify(req, res, next) {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Handle missing token
//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "Access denied. No token provided." });
//     }
//     const verifyuser = jsonwebtoken.verify(token, seckey);
//     req.user = verifyuser; // Attach user info to request object
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     return res.status(403).json({ error: "Invalid or expired token." });
//   }
// }

// app.get("/profilejobs", async (req, res) => {
//   console.log(req.body)

//   // try {
   
//   //   if (!token) {
//   //     return res
//   //       .status(401)
//   //       .json({ error: "Access denied. No token provided." });
//   //   }
//     const verifyuser = jsonwebtoken.verify(req.body.token, seckey);
//     console.log(verifyuser.id)
   
//   //   // const user = await userModel.findOne({ _id:  });
//   //   // if (!user) {
//   //   //   return res.status(404).json({ error: "User not found." });
//   //   // }
//   //   // res.json(user);

//   // } catch (error) {
//   //   res.status(500).json({ error: "Server error." });
//   // }
// });

app.post("/jobsaved",async(req, res) => {
  console.log("hello")
  console.log(req.body)

  const verifytoken=jsonwebtoken.verify(req.body.token,seckey)
  const verfiedid=verifytoken.id

  const result=await userModel.findOne({_id:verfiedid})
  const disp=result.savedjobindex
  console.log(disp)

  res.send({
    savedarray:disp,
    userinfo:{
      username:result.username,
      password:result.password
    },
    message:"data retrived succesfully"
  })
  
});


app.post("/userinfo",async(req,res)=>{
  console.log(req.body)

  const verifytoken=jsonwebtoken.verify(req.body.token,seckey)
  const verfiedid=verifytoken.id

  const result=await userModel.findOne({_id:verfiedid})
  // const disp=result.savedjobindex
  // console.log(disp)

  console.log(result.username,result.password)
  res.send({

    userinfo:{
      username:result.username,
      password:result.password
    },
    message:"data retrived succesfully"
  })
})




app.post("/updateUser",upload.single("resume"),(req,res)=>{
  const authHeader = req.headers.authorization;
  const tokenverify = authHeader.split(" ")[1];

  var details = jsonwebtoken.verify(tokenverify, seckey);
  console.log(details);
  console.log(req.body)
  res.send()
  

})


app.get("/example",async(req,res)=>{
  const response=await userModel.findOne({username:"Bumrah"})
  console.log(response)
  console.log("hello")
})

var port = 3002;
app.listen(port, () => {
  console.log("server started");
});
