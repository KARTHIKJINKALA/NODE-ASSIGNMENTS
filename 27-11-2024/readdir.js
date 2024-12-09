var http=require("http")
var server=http.createServer((req,res)=>{
    res.write("this is readdir")
    res.end()
})
var port=3008
server.listen(port,()=>{
    console.log("server has been created succesfully")
})