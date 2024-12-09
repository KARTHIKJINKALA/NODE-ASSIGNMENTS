// mkdir and readdir are used for working with directories in the file system module
var http=require("http")
var fs=require("fs")
var server=http.createServer((req,res)=>{
    // The fs.mkdir method is used to create a new directory.
    fs.mkdir("./newfile1/child2",{recursive:false},(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("folder created succesfully")
            res.end()
        }

    })
    res.write("this is mkdir")
    res.end()

})
var port=3007
server.listen(port,()=>{
    console.log("Servr has been created succesfully")
})