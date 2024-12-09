// mkdir and readdir are used for working with directories in the file system module
var http=require("http")
var server=http.createServer((req,res)=>{
    res.write("this is mkdir")
    res.end()

})
var port=3007
server.listen(port,()=>{
    console.log("Servr has been created succesfully")
})