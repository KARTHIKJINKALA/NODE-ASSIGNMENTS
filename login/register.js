var express=require("express")
var db=require("./db.js")
var bcrypt=require("bcrypt")
var transporter=require("./mailer.js")
console.log(mailer)

var app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))





// app.post("/register",async(req,res)=>{
    
//     var username=req.body.username
//     // var password=req.body.password

// var salt=10;
// var hashed_password=await bcrypt.hash(req.body.password,salt)
// console.log(hashed_password)
    
//     // Creating the table and inserting the values
//     // var create="CREATE TABLE NODEASSIGN (USERNAME VARCHAR(20),PASSWORD VARCHAR(20))"
//     var qinsert="INSERT INTO NODEASSIGN (USERNAME,PASSWORD) VALUES(?,?)"
// db.query(qinsert,[username,hashed_password],(err,data)=>{
//     if(err){
//         res.send(err.message)
//     }
//     else{
//         res.send(data)
//     }

// })
//     // res.send("karthik jinkala")
// })






app.post("/login",(req,res)=>{
    var qtotal="SELECT USERNAME,PASSWORD FROM NODEASSIGN"
    


    db.query(qtotal,async(err,data)=>{
        if(err){
            res.send(err.message)
        }
        else{
      
             
              for( i of data){
                // console.log(i.USERNAME,i.PASSWORD)\\
                c=0
                if(i.USERNAME==req.body.username){
                    c++
                }
                
              }
              if(c==1){
                console.log("user found")
                var match=await bcrypt.compare(req.body.password,i.PASSWORD)
                console.log(match)

                if(match){
                    res.send("login succesful")
                }
                else{
                    res.send("provide the correct password")
                }
                
            }
            else{
                res.send("user not found")
            }
        }
    })
})
var port=3005
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})