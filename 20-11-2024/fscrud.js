var http=require("http")
var fs=require("fs")

var server=http.createServer((req,res)=>{
    fs.readFile("./index1.html","utf-8",(err,data)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
    fs.writeFile("./writefile.txt","hello karthik","utf-8",(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("data written succsfully")
            res.end()
        }
    })
    fs.appendFile("./writefile.txt","hello world","utf-8",(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("data written succsfully")
            res.end()
        }
    })
    fs.unlink("./writefile.txt",(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("file deleted succesfully")
            res.end()
        }
    })
    // res.write('crud')
    // res.end()
})
var port=3001
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})