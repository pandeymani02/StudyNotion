import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from '../../common/IconBtn'
import { updateProfile } from '../../../services/operations/SettingsApi'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
const ProfileUpdation = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    }=useForm()

    const submitProfileForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
          dispatch(updateProfile(token, data))
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
      }
  return (
    <div className=' mx-auto text-richblack-5'>
        <h1 className=' text-3xl font-semibold'> Profile Information</h1>
        <form onSubmit={handleSubmit(submitProfileForm)}>

        {/* first &last name */}
        <div className=' flex lg:flex-row lg:justify-between flex-col'>
            <div className=' lg:w-[45%] flex flex-col mt-6 gap-y-2'>
            <label className="lable-style" htmlFor='firstName'>First Name</label>
            <input className='form-style' type='text' id='firstName' placeholder='Enter First Name' defaultValue={user?.firstName} {...register("firstName",{required:true})} />
            {errors.firstName &&(
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                    </span> 
            )}
            </div>
            <div className='lg:w-[45%]  flex flex-col mt-6 gap-y-2'>
                <label className="lable-style" htmlFor='lastName'>Last Name</label>
                <input className='form-style' type='text' id='lastName' placeholder='Enter Last Name' defaultValue={user?.lastName} {...register("lastName",{required:true})} />
                {errors.lastName &&(
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Last Name.
                </span> 
        )}
        </div>
        </div>

        {/* DOB&Gender */}
        <div className=' flex lg:flex-row lg:justify-between flex-col'>
            <div className=' lg:w-[45%] flex flex-col mt-6 gap-y-2'>
            <label className="lable-style" htmlFor='dateOfBirth'>Date of Birth</label>
            <input className='form-style' type='date' id='dateOfBirth' placeholder='Enter Date of Birth' defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth",{required:true})} />
            {errors.firstName &&(
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Date of Birth.
                    </span> 
            )}
            </div>
            <div className='lg:w-[45%]  flex flex-col mt-6 gap-y-2'>
            <label htmlFor="gender" className="lable-style">
                Gender
              </label>
                <select type='text' id='gender' className='form-style' placeholder='Enter Your Gender' defaultValue={user?.additionalDetails?.gender} {...register("gender",{required:true})}>
                    {
                        genders.map((ele,i)=>{
                            return(
                                <option key={i} value={ele}>
                                    {ele}
                                </option>
                            )
                        })
                    }
                </select>
                {errors.gender &&(
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Gender.
                        </span>
                )}
            </div>
        </div>

        {/* Contact Number & About */}
        <div className=' flex lg:flex-row lg:justify-between flex-col'>
            <div className=' lg:w-[45%] flex flex-col mt-6 gap-y-2'>
            <label className="lable-style" htmlFor='contactNumber'>Contact Number</label>
            <input className='form-style' type='tel' id='contactNumber' placeholder='Enter Contact Number' defaultValue={user?.additionalDetails?.contactNumber} {...register("contactNumber",{required:true})} />
            {errors.contactNumber &&(
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Contact Number.
                    </span> 
            )}
            </div>
            <div className='lg:w-[45%]  flex flex-col mt-6 gap-y-2'>
                <label className="lable-style" htmlFor='about'>About</label>
                <input className='form-style' type='text' id='about' placeholder='Enter About' defaultValue={user?.additionalDetails?.about} {...register("about",{required:false})} />
                {errors.lastName &&(
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.message}
                </span> 
        )}
        </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>

        </form>
    </div>
  )
}

export default ProfileUpdation