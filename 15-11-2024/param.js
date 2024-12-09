var http=require("http")
var url=require("url")

var server=http.createServer(async(req,res)=>{

    var api=await fetch("https://fakestoreapi.com/products/")
    var output=await api.json()
    var param=url.parse(req.url,true)
    // console.log(param)
    var param_data=param.pathname.split("/").pop()
    console.log(param_data)

    var response=output.filter((val)=>{
        return val.id==param_data
    })
    res.write(JSON.stringify(response))
    res.end()
})
var port=3004
server.listen(port,()=>{
    console.log("server has been created succesfully")
})