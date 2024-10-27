const Category=require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"both name and description are required"
            })
        }

        const CategoryDetatils= await Category.create({
            name:name,
            description:description
        });
        console.log(CategoryDetatils);
        return res.status(200).json({
            success:true,
            message:"Category created succesfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error,
            message:"error in entering Category"
        })
    }
}


exports.getAllCategory= async (req,res)=>{
    try {
        const allCategory=await Category.find({},{name:true,description:true}) 

        return res.status(200).json({
            success:true,
            message:"Got all Category",
            data:allCategory
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error,
            message:"error in getting all Category"
        })
    }
}


exports.categoryPageDetails=async(req,res)=>{
    try {
        const{ categoryId}=req.body;

        const selectedCategory=await Category.findById(categoryId).populate({
            path: "course",
            // match: { status: "Published" },
            populate: {
              path: "instructor",
          },
          }).exec();

        if(!selectedCategory){
            return res.status(500).json({
                success:false,
                message:"no category found"
            })
        }
        const categoriesExceptSelected= await Category.find({_id:{$ne:categoryId}}).populate("course").exec();
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
              ._id
          )
          .populate({
            path: "course",
          //   match: { status: "Published" },
            populate: {
              path: "instructor",
          },
          })
            .exec()
            //console.log("Different COURSE", differentCategory)
          // Get top-selling courses across all categories
          const allCategories = await Category.find()
            .populate({
              path: "course",
            //   match: { status: "Published" },
              populate: {
                path: "instructor",
            },
            })
            .exec()
          const allCourses = allCategories.flatMap((category) => category.course)
          const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        return res.status(200).json({
            success:true,
            message:"categoryPageDetails success",
            data:{selectedCategory,
                differentCategory,
                mostSellingCourses,}
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in category page Details",
            error:error.message
        })
    }
}