import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authapi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../services/operations/authapi';


const VerifyEmail = () => {
    const[otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { loading,signupData } = useSelector((state) => state.auth)

    useEffect(()=>{
        if(!signupData){
            navigate('/signup')
        }
    })

    const submitHandler=(e)=>{
        e.preventDefault();
        const{
            accountType,
            firstName,
            lastName,
            email,password,
            confirmPassword
        }=signupData
        console.log(accountType,firstName,lastName,email,password,confirmPassword,otp)
        dispatch(signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }

  return (
    <div className=' text-richblack-50  w-[500px] flex mx-auto mt-36 '>{
    loading?(<div>
          <div className="spinner"></div>
        </div>):(
        <div className=' p-8 w-full'>
            <h1 className=' text-richblack-5 text-3xl'>Verify email</h1>
            <p className=' mt-3 text-richblack-100 text-[18px]'>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={submitHandler} className=' pt-1 '>
                <OTPInput
                    value={otp}
                    onChange={(value)=> setOtp(value)}
                    numInputs={6}
                    renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-1 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}

                />
                <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              submit
            </button>
            </form>
            <div className=' flex justify-between'>
            <div className=' flex gap-1 text-center pt-3 items-center  mt-3 text-richblack-5'> <span className=' text-center'> <AiOutlineArrowLeft/></span><Link to="/login"> Back To Login  </Link></div>
            <div>
            <button className=' flex gap-1 text-center pt-3 items-center  mt-3 text-richblack-5' onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend It</button>
             </div>
            </div>
        </div>
    )
    }</div>
  )
}

export default VerifyEmail