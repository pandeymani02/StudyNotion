import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import {AiOutlineEdit} from "react-icons/ai"

const MyProfile = () => {
    const navigate= useNavigate()
    const{user}=useSelector((state)=>state.profile)
  return (
    <div className=' text-white  mx-auto '>
        <h1 className=' text-4xl text-richblack-5'> My Profile</h1>

        {/* section 1 */}
        <div className=' bg-richblack-800 justify-between items-center mt-16 flex rounded-md p-6'>
            <div className=' flex items-center gap-x-6' >
            <img src={user?.image} alt={`profile-${user?.firstName}`}
                  className=" aspect-square w-[78px] rounded-full object-cover"/>
                <div>
                    <p className=' first-letter:capitalize text-xl font-semibold'>{user.firstName+" "+user?.lastName}</p>
                    <p className=' text-richblack-300'>{user?.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} 
                >
                <AiOutlineEdit/>
          
            </IconBtn>
        </div>

        {/* section 2 */}

        <div className=' mt-6 bg-richblack-800 rounded-md p-6'>
            <div className=' flex justify-between'>
                <p className=' text-xl font-semibold'>About</p>
                <IconBtn
                    text="Edit"
                    onclick={()=>{ navigate("/dashboard/settings")}}
                ><AiOutlineEdit/> </IconBtn>
            </div>
            <p className=' text-richblack-300'>{  
                user?.additionalDetails?.about ?user?.additionalDetails?.about :"Write something about yourself"
            } </p>
        </div>

        {/* Section 3 */}

        <div className=' mt-6 bg-richblack-800 rounded-md p-6'>
            <div className=' flex items-center justify-between'>
                <p className=' text-xl font-semibold'>Personal Details</p>
                <IconBtn
                    text="Edit"
                    onclick={()=>{ navigate("/dashboard/settings")}}
                ><AiOutlineEdit/></IconBtn>

            </div>
     <div className=' mt-6 flex lg:w-7/12 justify-between flex-wrap'>
        <div className=' flex flex-col gap-y-3'>
                <div>
                    <p className=' text-richblack-300'>First Name</p>
                    <p>{user?.firstName}</p>
                </div>
                <div>
                    <p className=' text-richblack-300'>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <p className=' text-richblack-300'>Gender</p>
                    <p>{user?.additionalDetails?.gender ??"Add Gender"}</p>
                </div>
        </div>
        <div className='flex flex-col gap-y-3'>
                <div>
                    <p className=' text-richblack-300'>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
                <div>
                    <p className=' text-richblack-300'>Phone Number</p>
                    <p>{user?.additionalDetails?.contactNumber??"Add Phone Number"}</p>
                </div>
                <div>
                    <p className=' text-richblack-300'>Date Of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ??"Add Date Of Birth"}</p>
                </div>
        </div>
    </div>
            

        </div>
    </div>
  )
}

export default MyProfile