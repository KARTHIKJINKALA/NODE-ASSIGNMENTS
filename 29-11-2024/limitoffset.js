// create an api that sends response of fakestoredata based on limit and offset using express js
var express=require("express")
var app=express()


app.get("/products",async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()

    console.log(req.query)

    if(req.query.limit=="5" && req.query.offset=="5")



    res.send("this is limit and offset")
})
var port=3010
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})