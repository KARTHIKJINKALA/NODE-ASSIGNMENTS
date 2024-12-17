var http=require("http")
var fs=require("fs")

var server=http.createServer((req,res)=>{
    fs.readdir("child1/newtxt.txt",(err,files)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write(files)
            res.end()
        }
    })
    // res.write("this is readdir")
    // res.end()
})
var port=3008
server.listen(port,()=>{
    console.log("server has been created succesfully")
})