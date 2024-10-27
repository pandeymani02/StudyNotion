import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authapi';
import {AiOutlineArrowLeft} from "react-icons/ai"

const ForgotPassword = () => {
    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.auth);
    const[email,setEmail]=useState("")
    const [emailSent,setEmailSent]=useState(false);

    const handelSubmit=(e)=>{
        e.preventDefault();
        console.log("sent")
        dispatch(getPasswordResetToken(email,setEmailSent))
    }



  return (
    <div className=' flex   min-h-[calc(100vh-3.5rem)] place-items-center max-w-[500px] mx-auto'>
        {
            loading?(<div></div>):
          (  <div className=' p-8'>
                <h1 className=' text-richblack-5 text-3xl'>
                    { !emailSent ? "Reset Your Password":"Check Your Email"}
                </h1>
                <p className=' mt-2 text-richblack-100'>
                    {
                        !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handelSubmit} >
                    {
                        !emailSent &&(
                            <label>
                                <p className=' mt-9 mb-1 text-richblack-100'>Email Address <sup className=' text-pink-400'>*</sup> </p>
                                <input required type='email' name='email' value={email} onChange={(e)=>(setEmail(e.target.value))} placeholder=' Enter Your Email Address' className=' w-full bg-richblack-800 p-3  text-richblack-100 rounded-md shadow shadow-richblack-400'/>
                            </label>
                        )
                    }
                    {
                        !emailSent?<button className=' bg-yellow-50 mt-9 w-full text-center p-3 rounded-md text-[16px]'  type='submit'>Reset Password</button>:<button className=' bg-yellow-50 mt-9 w-full text-center p-3 rounded-md text-[16px]' type='submit'>Resend email</button>
                    }
                </form>
                <div className=' flex gap-1 text-center pt-3 items-center  mt-3 text-richblack-5'> <span className=' text-center'> <AiOutlineArrowLeft/></span><Link to="/login"> Back To Login  </Link></div>
                
            </div>)
        }
    </div>
  )
}

export default ForgotPassword