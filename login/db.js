var mysql=require("mysql2")
require('dotenv').config()

// var connection=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:12345,
//     database:"practice"
// })

console.log({
    DB_HOST:process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Optional, default is 3306
});

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("Mysql connection created succesfully")
    }
})

module.exports=connection