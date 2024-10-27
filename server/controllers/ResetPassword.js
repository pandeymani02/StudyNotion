const User=require('../models/User');
const mailSender=require('../utils/mailSender');
const bcrypt=require('bcrypt')
const crypto=require("crypto")

// exports.resetPasswordToken=async(req,res)=>{
//     try {
//         const email=req.body.email;
//         console.log(email);
//         const user= await User.findOne({email:email});
//         console.log(user);
//         if(!user){
//             return res.status(401).json({
//                 message:'Invalid email',
//                 success:false
//             })
//         }
//         console.log('ji');
//         const token=crypto.randomUUID();
//         console.log('ji');
//         const updatedDetails=await User.findOneAndUpdate({email:email},{
//             token:token,
//             resetPasswordExpires:Date.now()+2*60*1000
//         },{new:true});

//         console.log('ji');
        

//         const url=`http://localhost:3000/update-password/${token}`;
//         console.log('ji');
//         await mailSender(email,"password Reset Link"
//         ,`password reset Link: ${url}`);
//         console.log('ji');
//         return res.json({
//             success:true, 
//             message:"reset link sent",
            
//         })
//     } catch (error) {
//         return res.json({
//             success:false,
//             message:"reset link not sent",
//             error:error.message,
//         })
//     }

// }

exports.resetPasswordToken = async (req, res) => {
    try {
      const email = req.body.email
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.json({
          success: false,
          message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
        })
      }
      const token = crypto.randomBytes(20).toString("hex")
  
      const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 3600000,
        },
        { new: true }
      )
      console.log("DETAILS", updatedDetails)
  
      const url = `http://localhost:3000/update-password/${token}`
    //   const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`
  
      await mailSender(
        email,
        "Password Reset",
        `Your Link for email verification is ${url}. Please click this url to reset your password.`
      )
  
      res.json({
        success: true,
        message:
          "Email Sent Successfully, Please Check Your Email to Continue Further",
      })
    } catch (error) {
      return res.json({
        error: error.message,
        success: false,
        message: `Some Error in Sending the Reset Message`,
      })
    }
  }

exports.resetPassword=async(req,res)=>{
    try {
        const {password,confirmPassword,token}=req.body

        const userDetails= await User.findOne({token:token});
        if(!userDetails){
          return  res.status(502).json({
                "success": false,
                "message":"User Not Found"
            })
        }

        if(userDetails.resetPasswordExpires>Date.now()){
                return res.json({
                    success:false,
                    message:'Token expired'
                }); 
        }
        const hashedPassword=await bcrypt.hash(password,10);

        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        return res.status(200).json({
            "success": true,
            "message":"Password Reset Successfull."
        })
    } catch (error) {
        return res.status(500).json({
            "success": false,
            message:"error in reseting password",
            error:console.log(error.message)
        })
    }
}