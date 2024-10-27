const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate=require("../mail/templates/emailVerificationTemplate")
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{ 
        type:Date,
        default:Date.now(),
        expires:60 * 5
    }, 
})
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email,"Verification Email from StudyNotion",emailTemplate(otp));
        console.log("Email sent",mailResponse); 
    } catch (error) {
        console.log('Error in verification mail send',error)
    }


}
otpSchema.pre("save",async function(next){
    if(this.isNew){
    await sendVerificationEmail(this.email,this.otp);
    }next();
})

module.exports =mongoose.model("Otp",otpSchema);
