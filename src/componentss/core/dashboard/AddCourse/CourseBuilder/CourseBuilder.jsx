import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { BsPlusCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { setCourse, setEditCourse, setStep } from '../../../../../Slices/courseSlice'
import { toast } from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'
const CourseBuilder = () => {
    const {register,handleSubmit,setValue,formState:{ errors}}=useForm()
    const [edit ,setEdit]=useState(null)
    const {course}=useSelector((state)=>state.course) 
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch()
    const {token}=useSelector((state)=>state.auth)

    const onSubmit= async (data)=>{
        setLoading(true);
        let result;

        if(edit){
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: edit,
                courseId: course._id,
            },token)
        }
        else{
            result=await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            },token
            )
        }
        if(result){
            dispatch(setCourse(result));
            setEdit(null)
            setValue("sectionName","")
        }
        setLoading(false)
    }
    const cancelEdit=()=> 
    {
        setEdit(null)
        setValue("sectionName","")
        }
    const goBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));

    }
    const goToNext=()=>{
        if(course?.courseContent?.length===0){
            toast.error("Please Add Atleast one Section")
        return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please Add Atleast one Lecture")   
        }

        dispatch(setStep(3))

    }
    
    const handleChangeSectionName=(sectionId,sectionName)=>{
         if( edit===sectionId){
            cancelEdit()
            return
         }
         setEdit(sectionId)
         setValue("SectionName",sectionName)
    }
    
  useEffect(() => {
    console.log("UPDATED");
  }, [course])

  return ( 
    <div className=' text-richblack-5'>
        <p>
            Course Builder
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className=' flex flex-col'>
           <label htmlFor="sectionName" className=' lable-style'>Section Name:<span className=' text-pink-400'>*</span></label>
            <input type="text" id="sectionName" className=' form-style' placeholder='Enter the Section Name' {...register("sectionName",{required:true})}/>
            {
                errors.sectionName&&(
                    <span>Section Name Required***</span>
                )
            }
           </div>

           <div className=' mt-10 gap-x-3 flex'>
            <IconBtn text={`${edit?"Edit Section Name":"Create Section Name"}`}  type="submit">
            <BsPlusCircle/>
            </IconBtn>

            {
                edit &&(
                    <button type='button' onClick={cancelEdit}
                     className=' rounded-md text-richblack-300 p-3 bg-richblack-700'>
                        Cancel Edit
                    </button>
                )
            }
           </div>
           </form>
           {
            course?.courseContent?.length >0 &&(
                <NestedView 
                handleChangeSectionName={handleChangeSectionName}/> 
                
            )
        }
       
        
        <div className=' mt-10 flex justify-end gap-x-3'>
            <div onClick={()=>{goBack()}}  className=' flex items-center  rounded-md text-richblack-300 p-3 bg-richblack-700'>
            <span><AiOutlineLeft/> </span>  Back
            </div>
            <IconBtn text="Next" onclick={goToNext} >
                <AiOutlineRight/>
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilder