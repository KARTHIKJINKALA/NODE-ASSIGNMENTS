// create an api using fakestoredata and api should send response based on queries category and order ( use manual parsing)

var http=require("http")
var url=require("url")


var server=http.createServer(async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()

    var data=url.parse(req.url,true)
    
    var query=data.query
    console.log(query)



})

var port=3004
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})