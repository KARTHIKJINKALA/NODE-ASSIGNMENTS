
var http=require("http")
var otp=require("./otp.js")


var server=http.createServer((req,res)=>{
    res.write(JSON.stringify(otp))
    res.end()
})
var port=3001
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})