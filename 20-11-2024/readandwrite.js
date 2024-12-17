// create an api based on pathname if pathname = write .. it need to read data from one html file and write in new html file and if pathname = read .. need to read data use new html file

var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer((req, res) => {
  var param = url.parse(req.url, true);
  var pathname = param.pathname.split("/").pop();
  console.log(pathname);
  if (pathname == "write") {
    fs.readFile("./index1.html", "utf-8", (err, data) => {
      if (err) {
        res.write(err.message);
        res.end();
      } else {
        fs.writeFile("./index2.html", data, (err) => {
          if (err) {
            res.write(err.message);
            res.end();
          } else {
            res.write("data stored succesfully");
            res.end();
          }
        });
      }
    });
    //     res.write("this is write")
    // res.end()
  }
  if (pathname == "read") {
    fs.readFile("./readdata.html", "utf-8", (err, data) => {
      if (err) {
        res.write(err.message);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
   
  }

});



var port = 3004;
server.listen(port, () => {
  console.log("Server has been started succsfully");
});
