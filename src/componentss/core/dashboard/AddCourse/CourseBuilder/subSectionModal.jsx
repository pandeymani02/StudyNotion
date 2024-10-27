import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../Slices/courseSlice';
import { useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../upload';
import IconBtn from '../../../../common/IconBtn';


const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {
 const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
 }=useForm()

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }},[]);

    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl ) {
                return true;
            }
        else {
            return false;
        }
    }


    const  handleEditSubSection=async()=>{
        const currentValues=getValues();
        
        const formData=new FormData();
        formData.append("sectionId",modalData.sectionId)
        formData.append("subSectionId",modalData._id)
      
        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);

        const result=await updateSubSection(formData,token);

        if (result) {
      
            const updatedCourseContent = course.courseContent.map((section) =>
              section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
          }
          setModalData(null)
          setLoading(false)
    }
    const onSubmit=async(data)=>{
        if(view)
            return;
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made So far")
            }
            else{
                handleEditSubSection();
            }
            return
        }


        const formData=new FormData();
        formData.append("sectionId",modalData)
        formData.append("title",data.lectureTitle)
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo);

        setLoading(true);
        console.log(formData)

        const result=await createSubSection(formData, token);
        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>(
                section._id===modalData?result:section
            ))
            const updatedCourse={...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)
    }


    return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto  bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className=' min-w-[500px] bg-richblack-900 border p-8 rounded-md border-richblack-500 text-richblack-5'>
            <div className=' text-2xl text-richblack-5 flex justify-between  w-full'>
                <p>{
                    view&&"Viewing"
                }
                {
                    add&& "Adding"
                }
                {
                    edit&& "Edit"
                } Lecture</p>
                <button onClick={()=>(!loading?setModalData(null):{})}>
                    <RxCross1/>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload name="lectureVideo"
                label="Lecture video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view? modalData.videoUrl:null}
                editData={edit? modalData?.videoUrl:null}/>

                <div className=' flex flex-col mt-3'>
                    <label htmlFor='lectureTitle'>Lecture Title <sup className=' text-pink-400'>*</sup></label>
                    <input id='lectureTitle' placeholder='Enter Lecture title' className=' form-style' {...register("lectureTitle",{required:true})}/>
                    {
                        errors.lectureTitle &&
                       ( <span>Lecture Title Required**</span>)
                    }
                </div>
                <div className=' flex flex-col mt-3'>
                    <label htmlFor='lectureDesc'> Lecture Description <sup className=' text-pink-400'>*</sup></label>
                    <textarea id='lectureDesc' placeholder='Enter Lecture Description' {...register("lectureDesc",{required:true})
                    } className=' form-style w-full min-h-[130px]'  />
                    {
                        errors.lectureDesc &&
                       ( <span>Lecture Decription Required**</span>)
                    }
                </div>
                {
                    !view&&(
                        <div className=' flex justify-end mt-3'>
                            <IconBtn text={loading?"loading":edit?"Edit ":"Save changes"}></IconBtn>
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal