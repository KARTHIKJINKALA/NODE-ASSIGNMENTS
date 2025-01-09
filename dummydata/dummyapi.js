// create an api that sends response of fakestoredata based on limit and offset using express js
var express=require("express")
var app=express()
var  fs=require("fs")
var cors=require("cors")
console.log(cors())
app.use(cors())
app.use(express.json())


app.get("/products",(req,res)=>{


    fs.readFile("./haridata.json","utf-8",(err,data)=>{
        if(err){
           res.send( err.message)
        }
        else{
            // console.log(data)
            res.send(data)
        }
    })

})
var port=3010
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})