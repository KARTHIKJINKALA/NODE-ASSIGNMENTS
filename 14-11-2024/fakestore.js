// create an api to display student information as a response and api to send fakestore data as response
var express=require("express")
var app=express()

app.get("/fakestore",async(req,res)=>{

    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()
    console.log(out)
    res.status(200).send({
        status:200,
        products:out
    })
})
var port=3002
app.listen(port,()=>{
    console.log("Server has been started succsfully")
})