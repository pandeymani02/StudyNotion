const section=require('../models/Section');
const course=require("../models/Course");
const SubSection = require('../models/SubSection');


exports.createSection=async(req,res)=>{
    try {
        const{sectionName,courseId}=req.body;

        if(!sectionName||!courseId){
            return res.status(400).json({success:false,message:"Please provide all required fields"});

        }
        const newSection=await section.create({sectionName});
        //how to add populate to replace section and subSection both in updated course
        const updatedCourseDettails=await course.findByIdAndUpdate(courseId,{
            $push:{courseContent:newSection._id}},{new:true}).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			}).exec();

            return res.status(200).json({
                success:true,
                message:"section created successfully",
                updatedCourseDettails
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section created error ",
            error:error.message
        })
    }
}


exports.updateSection=async(req,res)=>{
    try {
        const{sectionName,sectionId,courseId}=req.body;
        if(!sectionName||!sectionId){
            return res.status(400).json({success:false,message:"Please provide all required fields"});
        }
       
        const Section=await section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
        const updatedSectionDetaills=await course.findById(courseId).populate({
            path:'courseContent',
            populate:{
                path:"subSection"
            }
        }).exec()
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            data:updatedSectionDetaills
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section updation error ",
            error:error.message
    })
}
}


exports.deleteSection=async(req,res)=>{
    try {
        const{sectionId,courseId}=req.body;
        await course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        const Section = await section.findById(sectionId);
		if(!Section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

        await SubSection.deleteMany({_id: {$in: Section.subSection}});
        console.log(SubSection)
        await section.findByIdAndDelete(sectionId);
        const updatedSectionDetaills=await course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		}).exec();
        console.log(updatedSectionDetaills)
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            data:updatedSectionDetaills
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section deletion error ",
            error:error.message
    })
}
} 
