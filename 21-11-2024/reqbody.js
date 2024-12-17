var http=require("http")
var fs=require("fs")

var server=http.createServer((req,res)=>{
    var body=""
    
    req.on("data",chunk=>{
     body+=chunk.toString()
    })
    req.on("end",()=>{
    console.log(body)
   
    fs.writeFile("./text1.txt",body,(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("written succesful")
            res.end()
        }
    })

    })




})
var port=3006
server.listen(port,()=>{
    console.log("server has been started successfully")
})