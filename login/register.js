var express=require("express")
var db=require("./db.js")
var app=express()


// var username="krishna"
// var password="13456"


app.post("/register",(req,res)=>{
    
    var username=req.body.username
    var password=req.body.password
    // Creating the table and inserting the values
    // var create="CREATE TABLE NODEASSIGN (USERNAME VARCHAR(20),PASSWORD VARCHAR(20))"
    var qinsert="INSERT INTO NODEASSIGN (USERNAME,PASSWORD) VALUES(?,?)"
db.query(qinsert,[username,password],(err,data)=>{
    if(err){
        res.send(err.message)
    }
    else{
        res.send(data)
    }

})
    // res.send("karthik jinkala")
})
var port=3005
app.listen(port,()=>{
    console.log("Servr has been started succesfully")
})