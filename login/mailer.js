var express=require("express")
var nodemailer=require("nodemailer")
// var dotenv=require("env")

var app=express()

var transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:"karthikjinkala11@gmail.com",
        pass:"kdwa xjjl uqaf pyqm"
    }
})

var options={
    from:"karthikjinkala11@gmail.com",
    to:"karthikjinkala12@gmail.com",
    subject: 'Sending Email using Node.js',
    text: 'hi bro namaste!'
}


module.exports=transporter
// app.get("/gmail",(req,res)=>{

//     transporter.sendMail(options,(err,info)=>{
//      if(err){
//         res.send(err.message)
//      }
//      else{
//         res.send(info)

//      }
//     })

//     // res.send("karthik")
// })
// var port=3009
// app.listen(port,()=>{
//     console.log("Server has been started")
// })

// create register api using the form