// create an api using fakestoredata and api should send response based on queries category and order ( use manual parsing)

var http=require("http")
var url=require("url")


var server=http.createServer(async(req,res)=>{
    var api=await fetch("https://fakestoreapi.com/products/")
    var out=await api.json()

    var data=url.parse(req.url,true)
    // console.log(data)
    var query=data.query
    // console.log(query)

    if(query.order=="asc"){
        out.sort((a,b)=>{
            return a.price-b.price
        })
        if(query.cat=="m"){
            var response=out.filter((val)=>{
                return val.category=="men's clothing"
            })
            res.write(JSON.stringify(response))
            res.end()
           
        }
    
        if(query.cat=="j"){
            var response=out.filter((val)=>{
                return val.category=="jewelery"
            })
            res.write(JSON.stringify(response))
            res.end()
           
        }
        
    }

    else if(query.order=="desc"){
        out.sort((a,b)=>{
            return b.price-a.price
        })
    }
    if(query.cat=="m"){
        var reponse=out.filter((val)=>{
            return val.category=="men's clothing"
        })
        res.write(JSON.stringify(response))
        res.end()
       
    }
    if(query.cat=="j"){
        var response=out.filter((val)=>{
            return val.category=="jewelery"
        })
        res.write(JSON.stringify(response))
        res.end()
    }
    else{
        res.write(JSON.stringify(out))
        res.end()
    }
    

})

var port=3005
server.listen(port,()=>{
    console.log("Server has been started succesfully")
})