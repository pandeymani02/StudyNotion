const jwt=require("jsonwebtoken");
require("dotenv").config();

const User=require("../models/User");

 exports.auth= async (req,res,next)=>{
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
                error:err.message
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
            error:error

        });
    }
}

exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType!=='Student'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"error in validating student"
        });
    }
}

exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType!=='Instructor'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for instructor"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"error in validating instructor"
        });
    }
}

exports.isAdmin=async(req,res,next)=>{
    try {
        console.log(req.user.accountType)
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"error in validating admin"
        });
    }
}