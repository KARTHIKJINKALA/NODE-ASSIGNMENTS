const express=require("express")
const app=express()

// const {dbConnect}=require("./Connect.js")

app.use(express.json())

get.post("/users/:Rohitsharma",()=>{
    res.send("hello")
})

const port=3006

app.listen(port,()=>{
    console.log("Server has been satrted succesfully")
})