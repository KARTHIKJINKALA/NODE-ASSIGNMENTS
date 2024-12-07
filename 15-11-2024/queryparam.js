// create an api using fakestoredata and api should send response based on params
var http=require("http")
var url=require("url")


var server=http.createServer(async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()
   
    // console.log(out)

    // param

    var data=url.parse(req.url,true)
    // console.log(data)
    // console.log(data.query)
    // var param=data.pathname
    // console.log(param)
    
    // var param_data=param.split("/").pop()
    // // console.log(param_data)

    // var response=out.filter((val,ind)=>{
    //     return val.id ==param_data
    // })

    // console.log(response)

    // query

    var query=data.query
    console.log(query)


    if(query.order=="asc"){

    out.sort((a,b)=>{
        return a.price-b.price
    })
    console.log(out)
 
    if(query.cat=="m"){
       var mens= out.filter((val,ind)=>{
            return val.category=="men's clothing"
        })
    }
    console.log(mens)

    res.write(JSON.stringify(mens))
    res.end()

    if(query.cat=="j"){
        var jewelers= out.filter((val,ind)=>{
             return val.category=="jewelery"
         })
     }
    console.log(jewelers)

     res.write(JSON.stringify(jewelers))
     res.end()

    }


    else if(query.order=="desc"){
        out.sort((a,b)=>{
            return b.price-a.price
        })
    console.log(desc)


        if(query.cat=="m"){
            var mens= out.filter((val,ind)=>{
                 return val.category=="men's clothing"
             })
         }
         console.log(mens)
         res.write(JSON.stringify(mens))
         res.end()

         if(query.cat=="j"){
            var jewelers= out.filter((val,ind)=>{
                 return val.category=="jewelery"
             })
         }
        console.log(jewelers)

         res.write(JSON.stringify(jewelers))
         res.end()
   

     }
     else{
             res.write(JSON.stringify(out))
             res.end()
     }
    
    
   
    
   

    // res.write(JSON.stringify(out))
    // res.end()
})

var port=3004
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})