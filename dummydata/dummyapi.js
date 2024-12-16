// create an api that sends response of fakestoredata based on limit and offset using express js
var express=require("express")
var app=express()
var  fs=require("fs")

var cors=require("cors")

app.use(express.json())
app.use(cors())


app.get("/products",(req,res)=>{


    fs.readFile("./duummy.json","utf-8",(err,data)=>{
        if(err){
           res.send( err.message)
        }
        else{
            res.send(data)
        }
    })

})
var port=3010
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})