const User=require("../models/User");
const Otp=require("../models/Otp");
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const mailSender=require("../utils/mailSender");
const {passwordUpdated}=require("../mail/templates/passwordUpdate");
const Profile=require("../models/Profile")


 
exports.sendotp=async (req,res)=>{
   try {
    const {email}=req.body;
    const checkUserPresent=await User.findOne({email:email});
    if(checkUserPresent){
        console.log(checkUserPresent)
    return res.status(401).json(
    
    {message:"Email already registered",
    success:false});
    }

    let otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });
    const result=await Otp.findOne({otp:otp});
    while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        result=await Otp.findOne({otp:otp});
    }

    const otpPayload={email,otp};

    const otpBody=await Otp.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
        success:true,
        message:`OTP has been sent to ${email}`
   })

   } catch (error) {
   console.log(error);
   return  res.status(401).json(
        {message:"error in sending otp",
        success:false,
        })
        
   }

}

exports.signup=async(req,res) =>{
    try {
        const{firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

    if(!firstName||!lastName||!email||!password||!confirmPassword||!otp||!accountType){
        return  res.status(401).json({success:false,message:"All Fields are requires"})
    }

    if(password!==confirmPassword){
        return   res.status(409).json({success: false,message:console.log("passwords doesnot match")});
    }

    const existingUser=await User.findOne({email});
    if(existingUser){
        res.status(402).json({success:false,message:"User Exists"});

    }

    const recentOtp=await Otp.find({email}).sort({createdAt:-1}).limit(1);

    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:'No valid OTP found'
        })
    }
   
    else if(otp!== recentOtp[0].otp){
        return res.status(403).json({
            success:false,
            message:' OTP doesnot match'
        })
    }

    const hashedPassword= await bcrypt.hash(password,10);
    let approved = "";
		approved === "instructor" ? (approved = false) : (approved = true);
    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about: null,
		contactNumber: null,
    })
    const user =await User.create({
        firstName,lastName,email,password:hashedPassword,accountType:accountType,approved:approved,additionalDetails:profileDetails._id,image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    return res.status(200).json({
        success:true,
        message:"user succefully registred",
        user
    })
    } catch (error) {
        return res.status(408).json({
            success:false,
            message:"Error in user signUp",
            error:error.message
        })
    }
}
 
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Both email and password are required"
            })
        };
        //check for the existence of a user with given credentials
        let user=await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not registered"
            });
        }
        

        if( await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            user.token=token;
            user.password=undefined;
            const options ={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Login successful'

            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Loggin failure",
            error:error.message
        });
    }
}

exports.changePassword=async(req,res)=>{
    try {
        // Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	
    }
}