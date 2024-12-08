// create an api based on pathname if pathname = write .. it need to read data from one html file and write in new html file and if pathname = read .. need to read data use new html file 

var http=require("http")
var url=require("url")
var fs=require("fs")

var server=http.createServer((req,res)=>{

    var param=url.parse(req.url,true)

   var param_data=param.pathname.split("/").pop()
    console.log(param_data)

    if(param_data=="write"){
        fs.readFile("./index1.html","utf-8",(err)=>{
            if(err){
        res.write(err.message)
            res.end()
            }
            else{
                res.write("written succesfull"+JSON.stringify(out))
            res.end()
            }
        })
    }


 
    

  
})
var port=3005
server.listen(port,()=>{
    console.log("Server has been created succesfully")
})