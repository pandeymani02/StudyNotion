import React from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
const TagField = ({name ,label, register, errors, setValue, getValue}) => {
    const [tags,setTags]=useState("")
    const [tagsList,setTagsLisst]=useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    const handleAdd=()=>{
        if(tags){
            setTagsLisst([...tagsList,tags])
            setTags("")
        }
    }
    const handleRemove=(index)=>{
        const temp=[...tagsList]
        temp.splice(index,1)
        setTagsLisst(temp)

    }
    useEffect(()=>{
        if(editCourse){
            setTagsLisst(course?.tag)
        }
        register(name,{
            required:true
        })
    },[])

    useEffect(()=>{
        setValue(name,tagsList)
    },[tagsList])

    const handleKey=(event)=>{
        if(event.key==="Enter" || event.key===","){
            event.preventDefault();
            handleAdd()
        }
    }


  return (
    <div>
    
        <div className=' flex flex-col'>
            <label className=' text-white' htmlFor={name}>{label}<sup className=' text-pink-400'>*</sup></label>
                    {
                    tagsList.length>0 &&(
                        <ul className=' flex gap-x-3 my-2 '>
                            {
                                tagsList.map((tag,index)=>{
                                    return(<li key={index} className='rounded-xl bg-yellow-200 px-1  flex items-center gap-x-2 text-richblack-5'>
                                        <span>{tag}</span>
                                        <button type='button' onClick={()=>handleRemove(index)} className=' text-xt cursor-pointer text-richblack-5'><MdClose/></button>
                                    </li>)
                                })
                            }
                        </ul>
                    )
                }
            <input type='text' id={name} onKeyDown={handleKey} placeholder={`Enter Course Tags`} value={tags} className='form-style'  onChange={(e)=>setTags(e.target.value)}>
            </input>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required
                </span>
            )}
        </div>
    </div>
  )
}

export default TagField