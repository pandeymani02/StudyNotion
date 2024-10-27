const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploade");
require('dotenv').config();

exports.createSubSection=async(req,res)=>{ 
    try {
        const{sectionId,title,description}=req.body;
        console.log(sectionId,title,description)
        const vedio=req.files.video
        if(!sectionId||!title ||!description||!vedio){
            return res.status(400).json({success:false,message:"Please provide all required fields"});
        }
        const uploadDetails=await uploadImageToCloudinary(vedio,process.env.FOLDER_NAME);
        const subSectionDeatils=await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        });
        //hw: isko bhi populate karna  check karna ;
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{ $push:{subSection:subSectionDeatils._id} },{new:true}).populate("subSection");
        return res.status(200).json({
            success:true, 
            message:"subsection creation successfully ",
            data:updatedSection
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"subsection creation error ",
            error:error.message
    })
    }
}


//hw updated subsection
exports.updateSubSection=async(req,res)=>{
    try {
        const { sectionId,subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
          const video = req.files.video
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save()
        const updatedSection=await Section.findById(sectionId).populate("subSection")

       
    
        return res.json({
          success: true,
          message: "Section updated successfully",
          data:updatedSection
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the Subsection",
          error
        })
      }
    }

//hw delete subsection
exports.deleteSubSection=async(req,res)=>{
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
    
        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
        const updatedSection=await Section.findById(sectionId).populate("subSection")
        return res.json({
          success: true,
          message: "SubSection deleted successfully",
          data:updatedSection
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
      }
    }
