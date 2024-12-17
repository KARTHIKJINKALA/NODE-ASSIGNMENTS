// create an api to read data from fakstoreapi and create file named products.json with that data
var http=require("http")
var fs=require("fs")

var server=http.createServer(async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var response=await api.json()
   
    fs.writeFile("./products.json",JSON.stringify(response),(err)=>{
        if(err){
            res.write(err.message)
            res.end()
        }
        else{
            res.write("data stored succesfully")
            res.end() 
        }
      
    })

    // res.write(JSON.stringify(response))
    // res.end()
})
var port=3002
server.listen(port,()=>{
    console.log("Server has been created succesfully")
})
