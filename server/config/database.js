const mongoose=require('mongoose');
require("dotenv").config();
const dbconnect=()=>{
    mongoose.connect(process.env.URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        .then(()=>console.log("database connected"))
        .catch((err)=>{
            console.log("Database error" ,err),
            process.exit(1)
        }) 
} 

module.exports=dbconnect;