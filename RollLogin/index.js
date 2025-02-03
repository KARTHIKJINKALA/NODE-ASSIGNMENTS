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

            var desc= filedata.filter((value)=>{
            return value.username==username  && value.password==password
           })

           var det=desc.map((value)=>{
            return value.username 
           })

           var det1=desc.map((value)=>{
            return value.password
           })
        //    console.log(det)
        //    console.log(det1)
           console.log("username:",username,"password:",password)
           console.log(det[0],det1[0])
           var fileuser=det[0]
           var filepass=det1[0]

         var userCheck=username==fileuser
         var passCheck=password==filepass



           

           console.log(userCheck)
           console.log(passCheck)
           


           var userid=filedata.map((value)=>{
            return value.id
           })
           console.log(userid)

           var userole=filedata.map((value)=>{
            return value.role
           })
           console.log(userole)

           if(userCheck && passCheck){
            // We are creating the json web token
            // JWT consists of payload and secreatkey
            // Paylaod is an object
          var token=  jsonwebtoken.sign({
                id:userid
            },seckey)
            console.log(token)

            res.send({
                data:"Login succesful",
                role:userole,
                token:token
            })
           }
           else{
            res.send("Invalid credentials")
           }


        // //    if(usercheck)
         
        }

    })
})


app.get("/products",(req,res)=>{
    // console.log(token)
    console.log(req.headers)

   var token= req.headers["authorization"].split(" ")[1]
   console.log(token)

   var details=jsonwebtoken.verify(token,seckey)
   console.log(details)

//    fs.readFile("./index.json","utf-8",(err,data)=>{

//        var data1=JSON.parse(data)
//        console.log(data1)

//       var output= data1.filter((value)=> {
//         return value.id==details.id
//        })
    
       
//         console.log(output)

        
//     if(output[0].role=="sell"){
//         fs.readFile("./sell.json",'utf-8',(err,data)=>{
//             if(err){
//                 res.send(err.message)
//             }
//             else{
//                 res.send(data)
//             }
//         })
//     }


//     else if(output[0].role=="buy"){
//         fs.readFile("./buy.json",'utf-8',(err,data)=>{
//             if(err){
//                 res.send(err.message)
//             }
//             else{
//                 res.send(data)
//             }
//         })
//     }


//     else{
//         res.send("Send correct data")
//     }

   })


    // var data=req.body.role

    // res.send("This are products")
// })


var port=3008
app.listen(port,()=>{
    console.log("Server has been started succesfully")
})