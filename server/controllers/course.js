const Course=require("../models/Course");
const Category = require("../models/Category");
const Section=require("../models/Section")
const SubSection = require("../models/SubSection")
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploade");
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")

require('dotenv').config();



exports.createCourse=async(req,res)=>{
    try {
        const{courseName,courseDescription,whatYouWillLearn,price,tag,category,
			status,
			instructions}=req.body;
            const thumbnail=req.files.thumbnailImage;
            console.log(thumbnail);
        if(!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        
        if (!status || status === undefined) {
			status = "Draft";
		}
        
        const userId=req.user.id;
        //check bby findById
        
        const instructorDetails= await User.findById(userId, {
			accountType: "Instructor",
		});
        console.log("instructor details:",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:true,
                message:"course instructor not found"
            }); 
        }

        const categoryDetails=await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:true,
                message:"course category not found"
            }); 
        }

        
        const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);

        const newCourse=await Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			 tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        })

        await User.findByIdAndUpdate({_id:instructorDetails._id},
            {$push:{courses:newCourse._id}},{new: true})
        
        // Homework tha please check
        await Category.findByIdAndUpdate({_id:category},
            {$push:{course:newCourse._id}},{new: true});

        return res.status(200).json({
            success:true,
            message:"course created successfully",
            newCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"course created error",
            error:error.message
        });
    }


}


// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      console.log(courseId,updates)
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


  // Get a list of Course for a given Instructor
exports.getInstructorCourse = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,

      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
// get all coursess
exports.getAllCourses=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{
            courseName:true,
            price:true,
            tumbNail:true,
            instructor:true,
            ratingAndReview:true,
            studentEnrolled:true,
        }).populate("instructor").exec();
    
        return res.status(200).json({
            success:true,
            message:"course fetched successfully",
            data:allCourses
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in getting all course",
            error:error
        })
    }
}


exports.getCourseDetails=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const courseDetaills=await Course.findOne({_id:courseId}).populate({
            path:'instructor',
            populate:{
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({path:"courseContent",
                    populate:{
                        path:"subSection"}
                    }).exec();        
        if(! courseDetaills){
            return res.status(400).json({
                success:false,
                message:`No such course found with id ${courseId}`})
            }

            let totalDurationInSeconds = 0
            courseDetaills.courseContent.forEach((content) => {
              content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
              })
            })
        
            const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        
            return res.status(200).json({
                success:true,
                message:"course details fetched success",
                courseDetaills,
                totalDuration})
            
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in fetching course data",
        error:error.message})
        
    }
}
  