import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';

import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../Slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { MdNavigateNext } from "react-icons/md"
import TagField from './TagField';
import Upload from '../upload';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    }=useForm();

    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const{course,editCourse}=useSelector((state)=>state.course)
    const[loading,setLoading]=useState(false);
    const[courseCategories,setCourseCategories]=useState([]);

    useEffect(()=>{
        const getCategories=async()=>{
            setLoading(true);
        const categories=await fetchCourseCategories();
        if(categories.length>0){
            setCourseCategories(categories);
        }
        setLoading(false)
        }

        if(editCourse){
            
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseImage", course.thumbnail)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            
            
        }

        getCategories();
    },[])

    const isUpdated=()=>{
        const currentValues=getValues();
        if (currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ){
            return true
        }
        return false
    }



    const onSumbit=async(data)=>{
        

        if(editCourse){
           if(isUpdated()){
            
            const currentValues=getValues();
            const formData= new FormData();

            formData.append("courseId",course._id);
            console.log(currentValues)
           
            if(currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
            }

            if(currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc);
            }

            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }
            if(currentValues.courseTags.toString() !== course.tag.toString()) {
                formData.append("tag", JSON.stringify(data.courseTags));
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }

            if(currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory);
            }
            //  CourseImage
            if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
              }
            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            const formDataIterator = formData.entries();

            // Convert the iterator to an array of objects
            const formDataArray = Array.from(formDataIterator).map(([key, value]) => ({ key, value }));

            // Log the array to the console to view the data
            console.log(formDataArray);

            setLoading(true);
            console.log(formData)
            const result= await editCourseDetails(formData,token);
            setLoading(false);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
           }
           else{
            toast.error("No Changes made so far")
           }
           return;
            
        }

        const formData= new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        
        setLoading(true);
        const result= await addCourseDetails(formData,token);
        if(result){
            
            dispatch(setStep(2));
            
            dispatch(setCourse(result));
            
        }
        setLoading(false);
    }

  return (
    <div className=' text-richblack-300'>
        <form onSubmit={handleSubmit(onSumbit)} className=' rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-6'>
            <div className=' flex flex-col'>
                <label className=' text-richblack-5' htmlFor='courseTitle'>Course Title <sup className=' text-pink-400'>*</sup></label>
                <input type='text' id='courseTitle' className='form-style' placeholder='Enter Course Title' {...register("courseTitle",{required:true})} 
                />
                {
                    errors.courseTitle &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title required</span>
                    )
                }
            </div>


            <div className=' flex flex-col'>
                <label className=' text-richblack-5' htmlFor='courseShortDesc'>Course Short Description <sup className=' text-pink-400'>*</sup></label>
                <textarea  id='courseShortDesc' className=' min-h-[140px] form-style' placeholder='Enter Course Description' {...register("courseShortDesc",{required:true})} 
                />
                {
                    errors.courseShortDesc &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description required</span>
                    )
                }
            </div>

            <div className=' flex flex-col relative'>
                <label className=' text-richblack-5' htmlFor='coursePrice'>Course Price <sup className=' text-pink-400'>*</sup></label>
                <input type='text' id='coursePrice' className=' pl-10 form-style ' placeholder='Enter Course Price' {...register("coursePrice",{required:true, valueAsNumber:true})} 
                />
                <HiOutlineCurrencyRupee className=' absolute text-richblack-300 translate-y-9 translate-x-1 text-2xl'/>
                {
                    errors.coursePrice &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price required</span>
                    )
                }
            </div>

            <div className=' flex flex-col'>
                <label className=' text-richblack-5' htmlFor='courseCategory'>Course category <sup className=' text-pink-400'>*</sup></label>
                <select type='text' id='courseCategory' defaultValue="" className='form-style' placeholder='Enter Course Category' {...register("courseCategory",{required:true})} 
                >
                <option value="" disabled>Choose a Category</option>
                {
                    !loading&& courseCategories.map((category,index)=>(
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        )
                    )
                }
                </select>
                {
                    errors.courseCategory &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category required</span>
                    )
                }
            </div>

            {/* Tag input */}
            <TagField name="courseTags" 
                label="Tags"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            {/* Upload input */}
            <Upload name="courseImage" 
                label="Display Picture"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                editData={editCourse?course?.thumbnail:null}/>

            <div className=' flex flex-col'>
                <label className=' text-richblack-5' htmlFor='courseBenefits'>Course Benifits <sup className=' text-pink-400'>*</sup></label>
                <textarea  id='courseBenefits' className=' min-h-[140px] form-style' placeholder='Enter Course Benifits' {...register("courseBenefits",{required:true})} 
                />
                {
                    errors.courseBenefits &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Benifits required</span>
                    )
                }
            </div>

            <RequirementField name="courseRequirements" 
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className='flex justify-end gap-x-2'>
                {
                    editCourse&&(
                        <button  onClick={() => dispatch(setStep(2))}
                            disabled={loading}
                             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
            </div>

        </form>
    </div>
  )
}

export default CourseInformationForm