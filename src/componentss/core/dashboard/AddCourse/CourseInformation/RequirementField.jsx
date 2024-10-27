import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"


const RequirementField = ({name ,label, register, errors, setValue, getValue}) => {
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirements,setRequirements]=useState("")
    const [requirementLists,setRequirementLists]=useState([])

    const handleAdd=()=>{
        if(requirements){
            setRequirementLists([...requirementLists,requirements])
            setRequirements("");
        }
    }
    const handleRemove=(index)=>{
        const updatedRequirementList= [...requirementLists];
        updatedRequirementList.splice(index,1);
        setRequirementLists(updatedRequirementList)
    }

    useEffect(()=>{
        if(editCourse){
            setRequirementLists(course?.instructions)
        }
        register(name,{
            required:true
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementLists)
    },[requirementLists])
    return (
    <div>
        <div className=' flex flex-col'>
            <label className=' text-white' htmlFor={name}>{label}<sup className=' text-pink-400'>*</sup></label>
            <input type='text' id={name} placeholder={`Enter Course Requirements`} value={requirements} className='form-style' onChange={(e)=>setRequirements(e.target.value)}></input>
        </div>
        <button type='button' onClick={handleAdd} className=' mt-1 font-semibold text-yellow-50'>Add</button>

        {
            requirementLists.length>0 &&(
                <ul className=' mt-2'>
                    {
                        requirementLists.map((requirement,index)=>{
                            return(<li key={index} className='  flex items-center gap-x-2 text-richblack-5'>
                                <span>{requirement}</span>
                                <button type='button' onClick={()=>handleRemove(index)} className=' text-xs text-pure-greys-300'>Clear</button>
                            </li>)
                        })
                    }
                </ul>
            )
        }
        {
            errors[name]&&(
                <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is Required</span>
            )
        }

    </div>
  )
}

export default RequirementField