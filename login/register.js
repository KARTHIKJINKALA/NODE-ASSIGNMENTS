var express=require("express")
var db=require("./db.js")
var bcrypt=require("bcrypt")
var app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// var username="krishna"
// var password="13456"


app.post("/register",async(req,res)=>{
    
    var username=req.body.username
    // var password=req.body.password

var salt=10;
var hashed_password=await bcrypt.hash(req.body.password,salt)
console.log(hashed_password)
    
    // Creating the table and inserting the values
    // var create="CREATE TABLE NODEASSIGN (USERNAME VARCHAR(20),PASSWORD VARCHAR(20))"
    var qinsert="INSERT INTO NODEASSIGN (USERNAME,PASSWORD) VALUES(?,?)"
db.query(qinsert,[username,hashed_password],(err,data)=>{
    if(err){
        res.send(err.message)
    }
    else{
        res.send(data)
    }

})
    // res.send("karthik jinkala")
})






// app.post("/login",(req,res)=>{
//     var qtotal="SELECT USERNAME,PASSWORD FROM NODEASSIGN"
   

//     db.query(qtotal,(err,data)=>{
//         if(err){
//             res.send(err.message)
//         }
//         else{
//            var c=0
//           for(i of data){
//             console.log(i)

//             if(i.USERNAME==req.body.username && i.PASSWORD==req.body.password){
//                 c++
//             }

//           }
//           if(c==1){
//             res.send("login succesful")
//           }
//           else if(c>1){
//             res.send("there are multiple users with ur name ")
//           }
//           else{
//             res.send("please provide the proper deatails")
//           }

//         }
//     })
// })
var port=3005
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})