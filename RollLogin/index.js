var express = require("express");
var fs = require("fs");
var app = express();
var cors = require("cors");

var jsonwebtoken = require("jsonwebtoken");
var seckey = "abcd12346ehbduase";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/register", (req, res) => {
  console.log(req.body);

  let datajson = [];
  console.log(req.body);
  datajson.push(...datajson, req.body);

  fs.appendFile("index.json", JSON.stringify(datajson), (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Register data stored succesfully");
    }
  });
});

app.post("/login", (req, res) => {
  // console.log(req.body)
  // res.send(req.body)

  fs.readFile("./index.json", "utf-8", (err, data) => {
    if (err) {
      req.send(err.message);
    } else {
      console.log(data);
      var filedata = JSON.parse(data);
      var { username, password } = req.body;
      console.log(req.body);
      console.log(filedata);
      console.log(username, password);

      var desc = filedata.filter((value) => {
        return value.username == username && value.password == password;
      });
      console.log(desc);

      var fileuser = desc.map((value) => {
        return value.username;
      });
      console.log(fileuser[0]);

      var filepass = desc.map((value) => {
        return value.password;
      });
      console.log(filepass[0]);

      var fileid = desc.map((value) => {
        return value.id;
      });
      console.log(fileid[0]);

      var filerole = desc.map((value) => {
        return value.role;
      });
      console.log(filerole[0]);

      var userCheck = username == fileuser;
      var passCheck = password == filepass;

      console.log(userCheck);
      console.log(passCheck);

      if (userCheck && passCheck) {
        // We are creating the json web token
        // JWT consists of payload and secreatkey
        // Paylaod is an object
        var token = jsonwebtoken.sign(
          {
            id: fileid,
          },
          seckey
        );
        console.log(token);

        res.send({
          data: "Login succesful",
          // role:filerole,
          token: token,
        });
      } else {
        res.send("Invalid credentials");
      }
    }
  });
});

app.get("/products", (req, res) => {
  // console.log(token)
  console.log(req.headers);

  var token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  var details = jsonwebtoken.verify(token, seckey);
  console.log(details);

  fs.readFile("./index.json", "utf-8", (err, data) => {
    var data1 = JSON.parse(data);
    console.log(data1);

    var output = data1.filter((value) => {
      return value.id == details.id;
    });

    console.log(output[0]);

    if (output[0].role == "sell") {
      fs.readFile("./sell.json", "utf-8", (err, data) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(data);
        }
      });
    } else if (output[0].role == "buy") {
      fs.readFile("./buy.json", "utf-8", (err, data) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(data);
        }
      });
    } else {
      res.send("Send correct data");
    }
  });

  // var data=req.body.role

  // res.send("This are products")
});

var port = 3008;
app.listen(port, () => {
  console.log("Server has been started succesfully");
});
