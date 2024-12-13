var mysql=require("mysql2")

var connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"5555",
    database:"practice"
})

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("Mysql connection created succesfully")
    }
})

module.exports=connection