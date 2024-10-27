import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps'
import { useEffect } from 'react'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../Slices/courseSlice'

export default function EditCourse(){
    const dispatch=useDispatch()
    const {courseId}=useParams()

    const{course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        ;(async () => {
          setLoading(true)
          const result = await getFullDetailsOfCourse(courseId, token)
          if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
          }
          setLoading(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    return(
        <div>
            <h1>Edit Course</h1>

            <div>
                {
                   course?(<RenderSteps/>):(<p>Course Not Found</p>) 
                }
            </div>
        </div>
    )

}