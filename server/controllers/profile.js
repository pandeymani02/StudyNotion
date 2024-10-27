const Course =require("../models/Course")
const CourseProgress = require("../models/CourseProgress");
const profile=require("../models/Profile");
const user=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploade");
const { convertSecondsToDuration } = require("../utils/secToDuration");


exports.updateProfile=async(req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        const id=req.user.id;
        if(!contactNumber||!dateOfBirth){
            return res.status(400).json({success:false,message:"Please provide all required fields"});
        }
        const userDetails=await user.findById(id);

        const profileId= userDetails.additionalDetails;
        const profileDetails= await profile.findById(profileId);

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;

        await  profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"profile updation success ",
            updatedUserDetails:profileDetails
    }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"profile updation error ",
            error:error.message
    }) 
    }
}


// exports.deleteAccount=async(req,res)=>{
//     try {
//         const id= req.user.id;
//         console.log(id)
//         const userDetails=await user.findById({ _id: id });
//         if(!userDetails){
//             return res.status(400).json({success:false,message:"user not found"});
//         }
//         // hw how to schedule a req and cronjob and unenroll studenr to all enrolled course 
//         console.log(userDetails)
//         // await profile.findByIdAndDelete({_id:userDetails.additionalDetails});
//         // await user.findByIdAndDelete({_id:id});
//         return res.status(500).json({ 
//             success:true,
//             message:"account deletion success "
//     }) 
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"account deletion error ",
//             error:error.message
//     }) 
//     }
// }
exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const userDetails = await user.findById({ _id: id });
		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await user.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};


exports.getAllUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetails=await user.findById(id).populate("additionalDetails").exec();
        return res.status(500).json({
            success:true,
            message:"userdetails fetching success ",
            userDetails
    }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"userdettials fetching error ",
            error:error.message
    }) 
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await user.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       console.log("h1")
//       const userId = req.user.id
//       console.log(userId) 
//       const userDetails = await user.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         }) 
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
  
    let userDetails = await user.findOne({
      _id: userId,
    })
    .populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

    
    userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }


    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}
