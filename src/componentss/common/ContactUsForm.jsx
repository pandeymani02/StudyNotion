import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import countrycode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading,setLoading]=useState(false);
    const submitContactForm=async(data)=>{
        console.log("Logging Data",data);
        try {
            setLoading(true);
            // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            console.log(loading)
            setLoading(false)
        } catch (error) {
            console.log(error.message)

        }
    }
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}}=useForm()
    
        useEffect(()=>{
            if(isSubmitSuccessful){
                reset({
                 email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
                    }
                )
            }
        },[reset,isSubmitSuccessful])
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className=' text-black'>
       <div className=' flex flex-col gap-y-8'>
       <div className=' flex  lg:flex-row flex-col lg:gap-5'>
        {/* firstname */}
            <div className=' flex flex-col w-full'>
                <label htmlFor='firstname' className=' text-richblack-25'>First Name</label>
                <input type='text' name='firstname' id='firstname' placeholder='Enter first name'
                    {...register("firstname",{required:true})}
                    className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' />
                {errors.firstname&&(
                    <span>Please Enter your name</span>
                )}
            </div>

            {/* lastname */}
            <div className=' flex flex-col  w-full lg:mt-0 mt-8'>
                <label htmlFor='lastname'  className=' text-richblack-25'>Lastname</label>
                <input type='text' name='lastname' id='lastname' placeholder='Enter last name'
                    {...register("lastname",{required:false})}
                    className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' />
            </div>
        </div>

          {/* email */}
          <div className=' flex flex-col'>
                <label htmlFor='email'  className=' text-richblack-25'>Email</label>
                <input type='email' name='email' id='email' placeholder='Enter email'
                    {...register("email",{required:true})}
                    className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' />
                {errors.firstname&&(
                    <span>Please Enter your email</span>
                )}
            </div>

            {/* phoneNo */}
            <div className=' flex flex-col  gap-x-10'>
                    <label htmlFor='dropdown'  className=' text-richblack-25' >Phone Number</label>
                    <div className=' flex flex-row  gap-5'>
                        {/* dropdown */}
                            <select name='dropdown' id='dropdown'  className=' w-[61px] bg-richblack-800 relative pl-1 py-4 mt-1  rounded-md shadow shadow-richblack-400 text-richblack-100 '  {...register("dropdown",{required:true})} >
                            {
                                countrycode.map((countrycode,index)=>{
                                    return(
                                        <option key={index} value={countrycode}> {countrycode.code}{ "  "} -{ countrycode.country}</option>
                                    )
                                })
                            }
                            </select>


                            {/* phonenumber */}
                            <input type='number'  name='phonenumber' id='phonenumber' placeholder='12345 67890'  className=' w-[85%] bg-richblack-800 relative pl-1 py-4 mt-1  rounded-md shadow shadow-richblack-400 text-richblack-100 ' 
                                {...register("phonenumber",{required:true
                                                      ,maxLength:{value:10,message:"Invalid Phone Number"},
                                                       minLength:{value:8,message:"Invalid Phone Number"},})}
                             />
                            {errors.phonenumber&&(
                                <span>Please Enter your Phone Number</span>
                            )}

                    </div>
            </div>

            {/* message */}
            <div className=' flex flex-col'>
                <label htmlFor='message'  className=' text-richblack-25' >Message</label>
                <textarea name='message' id='message' cols="30" rows="7" placeholder='Enter Your Message'
                     {...register("message",{required:true})}
                     className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 '  />
                {errors.firstname&&(
                    <span>Please Enter your Message</span>
                )}
            </div>

            {/* button */}
            <button  className=' mt-8 bg-yellow-50 w-full text-center p-3 rounded-md text-[16px]' type='submit'>
                Submit
            </button>
       </div>
    </form>
  )
}

export default ContactUsForm