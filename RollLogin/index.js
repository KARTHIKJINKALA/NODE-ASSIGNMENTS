var express=require("express")
var fs=require("fs")
var app=express()
var jsonwebtoken=require("jsonwebtoken")
var seckey="abcd12346ehbduase"
app.use(express.json())

app.post("/register",(req,res)=>{
    // console.log(req.body)
    fs.writeFile("index.json",JSON.stringify(req.body),(err)=>{
        if(err){
            res.send(err.message)
        }
        else{
            res.send("Register data stored succesfully")
        }
    })
    
})

app.post("/login",(req,res)=>{
    // console.log(req.body)
    // res.send(req.body)

    fs.readFile("./index.json","utf-8",(err,data)=>{
        if(err){
            req.send(err.message)
        }
        else{
            console.log(data)
           var filedata= JSON.parse(data)
           var {username,password}=req.body
           console.log(req.body)
           console.log(filedata)

           var userCheck=username==filedata.username
           var passCheck=password==filedata.password

           console.log(userCheck)
           console.log(passCheck)

           if(userCheck && passCheck){
            // We are creating the json web token
            // JWT consists of payload and secreatkey
            // Paylaod is an object
          var token=  jsonwebtoken.sign({
                id:filedata.id
            },seckey)
            console.log(token)

            res.send({
                data:"Login succesful",
                // role:filedata.role
                token:token
            })
           }
           else{
            res.send("Invalid credentials")
           }


        //    if(usercheck)
         
        }

    })
})


app.get("/products",(req,res)=>{

   var token= req.headers["authorization"].split(" ")[1]
   var details=jsonwebtoken.verify(token,seckey)
//    console.log(details)

   fs.readFile("./index.json","utf-8",(err,data)=>{

       var data1=JSON.parse(data)
       console.log(data1)

      var output= data1.filter((value)=> {
        return value.id==details.id
       })
       
        console.log(output[0].role)

        
    if(output[0].role=="sell"){
        fs.readFile("./sell.json",'utf-8',(err,data)=>{
            if(err){
                res.send(err.message)
            }
            else{
                res.send(data)
            }
        })
    }


    else if(output[0].role=="buy"){
        fs.readFile("./buy.json",'utf-8',(err,data)=>{
            if(err){
                res.send(err.message)
            }
            else{
                res.send(data)
            }
        })
    }


    else{
        res.send("Send correct data")
    }

   })


    // var data=req.body.role

    // res.send("This are products")
})


var port=3008
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})