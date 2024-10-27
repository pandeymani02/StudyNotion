import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineCaretDown} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authapi'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
const ProfileDropDown = () => {
    const {user}=useSelector((state)=>state.profile)
    const [open,setOpen]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const ref=useRef()

    useOnClickOutside(ref,()=>setOpen(false))

    return (
    <div className=' cursor-pointer flex'>
      <div className=' text-center flex items-center gap-1' onClick={()=>setOpen((prev)=>(!prev))}>
        <div className=''><img src={user?.image} className=' w-[30px] aspect-square object-cover rounded-full' loading='lazy' /></div> 
        <div className=' text-richblack-200 text-center'><AiOutlineCaretDown/></div>
       </div>

    <div  ref={ref}  onClick={(e) => e.stopPropagation()}  className={ ` translate-y-14 z-20   -translate-x-14 ${open?" visible opacity-100":"invisible opacity-0"} mt-5`}>
      <div className=' border-richblack-700   text-richblack-5 flex flex-col bg-richblack-800 border   rounded-md '>
          <div className=' flex  items-center p-2  hover:bg-richblack-700 gap-x-1'><VscDashboard/> <Link to="/dashboard/my-profile"> Dashboard</Link> </div>
          <div className=' cursor-pointer p-2 flex   items-center gap-1 border-t border-richblack-700'
           onClick={()=>{
            dispatch(logout(navigate))
            setOpen((prev)=>(!prev))
           }}>

          <VscSignOut/>  Logout</div>
        </div>
          
        
      
    </div>
    </div>
  )
}

export default ProfileDropDown