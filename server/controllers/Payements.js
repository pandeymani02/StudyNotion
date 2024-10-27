const {mongoose } = require('mongoose');
const {instance}=require('../config/razorpay');
const Course=require("../models/Course");
const User=require('../models/User');
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require("crypto");
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 1;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            console.log(course)
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }
          
            totalAmount = totalAmount+ course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("hi",body)
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        console.log("hi",expectedSignature)

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}

const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }
        const courseProgress = await CourseProgress.create({
            courseId:courseId,
            userId:userId,
            completedVideos: [],
        })
        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress:courseProgress._id
            }},{new:true})
            
       
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        } 
    }

}

exports.sendPayementEmail=async(req,res)=>{
    const {orderId,payementId,amount}=req.body;
    console.log(orderId,payementId,amount)
    const userId=req.user.id

    if(!orderId||!payementId||!amount){
        return  res.status(422).json({success:true,message:"Please provide all required fields"})
    }
    try {
        const enrolledStudent=await User.findById(userId);
        await mailSender(enrolledStudent.email,`Payement Recieved`,
        paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,payementId)
        )
        return res.status(200).json({
            success:true,
            message:"succefully Email sent"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}


























// exports.capturePayment=async (req,res)=>{
//     try {
//         const{courseId}=req.body;
//         const userId=req.user.Id;
//         if(!courseId){
//             return res.status(401).json({success:false,message:"Invalid course id"})
//         }
//         let course;
//         try {
//             course= await Course.findById(courseId);
//             if(!course){
//                 return res.status(401).json({success:false,message:"Invalid course"})
//             }

//             const uid=new mongoose.Types.ObjectId(userId);

//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:true,
//                     message:'You have already enrolled for this course'
//                 })
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:'error in fetching course from courseId',
//                 error:error.message
//             })
//         }
//         const amount=course.price;
//         const currency="INR";
//         const options={
//             amount:amount*100,
//             currency,
//             reciept: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId
//             }
//         }
//         try {
//             const payementResponse =await instance.orders.create(options);
//             console.log('payemnt response:',payementResponse,'\n');
//             return res.status(200).json({
//                 success:true,
//                 message:'order initiated',
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 courseThumbnail: course.tumbNail,
//                 orderId:payementResponse.currency,
//                 price: payementResponse.amount/100
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:'coudnt initiate oreder'
//             })
//         }
       
    
//         }
//      catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:'error in order creation',
//             error:error.message
//         })
//     }

// }
// exports.verifySignature=async(req,res)=>{
//     const webHookSecret="12345678"

//     const Signature=req.headers("x-razorpay-signature");

//     const shaSum=crypto.createHmac("sha256",webHookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const digest=shaSum.digest("hex");

//     if(Signature===digest){
//         console.log("payement is authorised");

//         const{courseId,userId}=req.body.payload.payment.entity.notes;
        
//         try {
//             const enrolledCourse= await Course.findOneAndUpdate(
//                 {_id:courseId},{$push:{studentEnrolled:userId}},{new:true}
//             )
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message:"Error updating the database with student enrollment."
//                 })
//             }
//             console.log(enrolledCourse);
//             const enrolledStudent =await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
//             if(!enrolledStudent){
//                 return res.status(500).json({
//                     success: false,
//                     message:"Error updating the database with enrol course."
//                 })
//             }
//             console.log(enrolledStudent);
//             const emailResponse=await mailSender(enrolledStudent.email,"congo","you are selcted");
//             console.log(`mail sent to ${userEmail} ${emailResponse}`);

//             return res.status(200).json({
//                 success: true,
//                 message:"Signature matched coussse added."
//             })
//         } catch (error) {
//              return res.status(500).json({
//                     success: false,
//                     message:"Error in enrolling",
//                     error:error.message
//                 })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message:"invalid request"
//         })
//     }
// }