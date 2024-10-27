const express=require('express');
const app=express();

const userRoutes=require("./routes/User");
const PaymentsRoutes=require("./routes/Payments");
const ProfileRoutes=require("./routes/Profile");
const CourseRoutes=require("./routes/Course");

const dbconnect=require('./config/database');
const {cloudinaryConnect}=require("./config/cloudinary");
const cors=require("cors");
const cookieParser=require('cookie-parser');
const fileUpload=require("express-fileupload");
require("dotenv").config();
console.log(process.env.PORT) 
const PORT=process.env.PORT||4000; 
app.use( 
	cors({
		origin:"*",
		credentials:true,
	})
)
dbconnect();

app.use(express.json());
app.use(cookieParser());


 app.use(
        fileUpload({
            useTempFiles : true,
            tempFileDir  : "/tmp",
        })
 )

 cloudinaryConnect();

 app.use("/api/v1/auth",userRoutes);
 app.use("/api/v1/profile",ProfileRoutes);
 app.use("/api/v1/payment",PaymentsRoutes); 
 app.use("/api/v1/course",CourseRoutes);


 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
 })

 app.get("/",(req,res)=>{
    res.send("<h2>Welcome to the API</h2>");
 })
