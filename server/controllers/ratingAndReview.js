const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

exports.createRating=async(req,res)=>{
    try {
        const{rating,review,courseId}=req.body;
        const userId=req.user.id;
        if(!rating ||!review){
            return res.status(401).json({
                success:false,
                message:"Please provide rating and review"})
        }
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId} },
        });

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"student is not enroled for rating"})
            }
        const alreadyReviewed=await RatingAndReview.findOne({user:userId,
                                                            Course:courseId   })

        if(alreadyReviewed){ return res.status(400).json({
            success:false,
            message:"alreay reviewed by user"})
        }
        const ratingReview=await RatingAndReview.create({
            rating,
            review,
            user:userId,
            course:courseId
        })
        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReview:ratingReview._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:"rating and review created",
            ratingReview,})
        

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in creating ratig and review",
            error:error.message})
        }   
}


exports.getAverageRating=async(req,res)=>{
    try {
        const{courseId}=req.body;
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                     course: new mongoose.Types.ObjectId(courseId)}
            },
            {$group:{
                _id:null,averageRating:{$avg:"rating"}
            }}
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }
        return res.status(200).json({
            success:true,
            averageRating: 0,
            message:"RATING HAS NOT GIVEN YET"
        })

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"error in getting avg rating",
            error:error.message
        })
    }
}


exports.getAllRating=async(req,res)=>{
    try {
        
        const result= await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:'user',select:'firstName lastName email image' 
        }).populate({path:"course",select:"courseName"}).exec();

        return res.status(200).json({
            success:true,
            message:"all reviewFetched",
            result
        })


    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"error in grting all rating",
            error:error.message
        })  
    }
}
