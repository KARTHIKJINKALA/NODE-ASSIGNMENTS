const express=require("express")
const app=express()
const {dbConnect}=require("./Connect.js")

dbConnect()

app.get("/",(req,res)=>{
    res.send("hello this is the Mongodb")
})
const port=3005
app.listen(port,()=>{
    console.log("Server has been started")
})


