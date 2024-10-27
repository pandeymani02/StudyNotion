import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {BsPlusCircle} from 'react-icons/bs'
import CourseTable from './InstructorTable/CourseTable';
import { useState } from 'react';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setCourses(result)
            }
           return
        }
        fetchCourses();
    },[])
  return (
    <div className=' text-richblack-5'>
        <div>
            <h1>My Courses</h1>
            <IconBtn text="Add courses"
             onclick={()=>{ navigate("/dashboard/add-course")}}>
                <BsPlusCircle/>
            </IconBtn>
        </div>
        {
            courses&&<CourseTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses