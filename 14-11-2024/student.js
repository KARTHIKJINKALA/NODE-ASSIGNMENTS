// create an api to display student information as a response and api to send fakestore data as response
var express=require("express")
var app=express()

app.get("/students",(req,res)=>{
    var student={
        name:"Karthik",
        age:21,
        mobile:"+917848493830",
        college:"sreyas institute of engineering and technology hyderabad",

    }
    res.send(student)
})
var port=3001
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})