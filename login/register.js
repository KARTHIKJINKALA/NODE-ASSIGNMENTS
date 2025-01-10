var express = require("express");
var db = require("./db.js");
var bcrypt = require("bcrypt");
const upload = require("./multer.js");
var dotenv=require('dotenv').config()
var cors=require("cors")



var { transporter, options } = require("./mailer.js");

// console.log(transporter)

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



app.post("/register", upload.single("profilepic"), async (req, res) => {
  //For storing the username
  var username = req.body.username;

  //For storing the file path
  //   console.log(req.file.path);
  var store_path = req.file.path;

  // hashing the password to store in the database
  var salt = 10;
  var hashed_password = await bcrypt.hash(req.body.password, salt);
  //   console.log(hashed_password);

  // for storing the otp we have to send the mail to the user

  transporter.sendMail(options, (err, info) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("Email sent successfully!");
    }
  });

  // Extracting the otp
  // console.log(options)
  var emp = "";
  for (i = options.text.length - 1; i >= 13; i--) {
    emp += options.text[i];
  }
  // console.log(emp)

  // reversing for original otp
  var OTP = [];
  for (j = emp.length - 1; j >= 0; j--) {
    OTP += emp[j];
  }

  var original_otp = OTP;
  console.log(original_otp);

  // Creating the table and inserting the values
  // var create="CREATE TABLE NODEASSIGN (USERNAME VARCHAR(20),PASSWORD VARCHAR(20))"
  var qinsert =
    "INSERT INTO NODEASSIGN (USERNAME,PASSWORD,FILEPATH,OTP) VALUES(?,?,?,?)";
  db.query(
    qinsert,
    [username, hashed_password, store_path, original_otp],
    (err, data) => {
      if (err) {
        res.send(err.message);
        
      } else {
        res.send("Register succesfull");
      }
    }
  );
  // res.send("karthik jinkala")
});




// for login

app.post("/login", (req, res) => {
  console.log(req.body);
  var qtotal = "SELECT USERNAME,PASSWORD,FILEPATH,OTP FROM NODEASSIGN";

  db.query(qtotal, async (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      for (i of data) {
        c = 0;
        if (i.USERNAME == req.body.username) {
          c++;
        }
      }

      if (c == 1) {
        console.log("user found");
        var match = await bcrypt.compare(req.body.password, i.PASSWORD);
        console.log(match);

        if (match) {
          if (req.body.otp == i.OTP) {
            console.log(i.OTP);
            res.send("login succesful");
          } else {
            res.send("Invalid otp");
          }
        } else {
          res.send("provide the correct password");
        }
      } else {
        res.send("user not found");
      }
    }
  });
});
var port = 3005
app.listen(port, () => {
  console.log(process.env.REG_PORT)
  console.log("Server has been started succesfully");
});
