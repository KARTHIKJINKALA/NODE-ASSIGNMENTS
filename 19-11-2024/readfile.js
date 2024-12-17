// create an api  to create file and read file using fs module
var http=require("http")
var fs=require("fs")

var server=http.createServer(async(req,res)=>{
    // var writefile
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()

    // fs.writeFile("./text.json",JSON.stringify(out),"utf-8",(err)=>{
    //     if(err){
    //         res.write(err.message)
    //         res.end()
    //     }
    //     else{
    //         res.write("File added succesfully")
    //         res.end()
    //     }
    // })

    fs.readFile("./text.json","utf-8",(err,data)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })



    // res.write("karthik")
    // res.end()
})
var port=3004
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})
