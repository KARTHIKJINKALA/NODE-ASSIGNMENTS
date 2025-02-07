var express = require("express");
var app = express();
var cors = require("cors");
var { dbConnect } = require("./regmongo");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());

dbConnect();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const userModel = mongoose.model("Useregister", userSchema);

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

var port = 3002;
app.listen(port, () => {
  console.log("server started");
});
