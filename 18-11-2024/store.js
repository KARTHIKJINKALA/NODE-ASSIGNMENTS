// create an api using fakestoredata and api should send response based on pathname as /products should give entire data and /products/param should give particular data
var http=require("http")
var url=require("url")

var server=http.createServer(async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()

    var param=url.parse(req.url,true)
    console.log(param.pathname)

    var param_data=param.pathname.split("/").pop()
    console.log(param_data)
   

        res.write(JSON.stringify(out))
        res.end()
 
    if(param.pathname=="/"+param_data){
       var result=out.filter((val)=>{
            return val.id==param_data
        })
        res.write(JSON.stringify(result))
        res.end()

    }



   

    // res.write(JSON.stringify(out))
    // res.end()
})




var port=3004
server.listen(port,()=>{
  console.log("Server has been started succesfully")
})
