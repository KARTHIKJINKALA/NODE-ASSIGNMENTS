var express = require("express");
var app = express();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploadresume");
  },
  filename: (req, file, cb) => {
    console.log(file);
    // here we need to write the filename
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/products", upload.single("file"), (req, res) => {
  console.log("path:" + req.file);
  
  res.send({
    file: req.file,
    data: req.body,
  });
});

var port = 3006;
app.listen(port, () => {
  console.log("server is running succesfully");
});
