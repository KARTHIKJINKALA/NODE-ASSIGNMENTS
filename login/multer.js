var express=require("express")
var app=express()
var multer=require("multer")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

var storagedata=multer.diskStorage({
    destination:(req,file,cb)=>{
           cb(null,"./images")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

var upload=multer({storage:storagedata,
    limits:{
         fileSize:1.5*1024*1024 
    },
    fileFilter:(req,file,cb)=>{
        console.log(file)

        const allowedmimes=["image/jpg","image/png","image/jpeg"]
     
        if(allowedmimes.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed!"), false)
        }
    }
})

module.exports=upload

// app.post("/upload",upload.single("profilepic"),(req,res)=>{
//     console.log(req.file)
//     res.send(req.file)

// })

// var port = 3008;
// app.listen(port, () => {
//     console.log("Server has been started successfully");
// });