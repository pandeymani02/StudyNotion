import React from 'react'
import HighlightText from '../componentss/core/HomePage/HighlightText'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import Signupimg from "../assets/Images/signup.webp" 
import frame from "../assets/Images/frame.png"
import { ACCOUNT_TYPE } from '../utils/constants'
import { setSignupData } from '../Slices/authSlice'
import { useDispatch } from 'react-redux'
import { sendOtp } from '../services/operations/authapi'
import { toast } from 'react-hot-toast'



const Signup = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [formData, setFormData] = useState({email: "", password:"",confirmPassword:"", firstName:"" ,lastName:""})
    const [showPassword,setShowPassword]=useState(false);
    const [ConfirmShowPassword,setConfirmShowPassword]=useState(false);
    const [selected,setSelected]=useState(ACCOUNT_TYPE.STUDENT);
    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const { email, password,confirmPassword,firstName,lastName } = formData
    const submitHandler=(e)=>{
       e.preventDefault();
       console.log("ue")
       if (password !== confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }
      const accountType=selected
      const signupData = {
        ...formData,
        accountType,
      }
      
    
      dispatch(setSignupData(signupData));
      dispatch(sendOtp(formData.email,navigate))
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setSelected(ACCOUNT_TYPE.STUDENT)
    }
  return (
    <div className=' bg-richblack-900 '>
    <div className=' flex flex-col-reverse lg:flex-row w-10/12 mx-auto  mt-16 items-center justify-between'>
        <div className=' flex flex-col mb-3 lg:w-[35%] mt-6 lg:mt-1'>
            <div className=' text-3xl font-semibold text-richblack-5 font-inter'>
            Join the millions learning to code with StudyNotion for free
            </div> 

            <div className=' mt-3 text-richblack-100 text-lg'>
            Build skills for today, tomorrow, and beyond.
            </div>

            <i className=' text-lg'><HighlightText text={"Education to future-proof your career."}/></i>

            {/* slider */}
            <div className=' bg-richblack-800 rounded-full mt-3 flex w-fit py-1 px-2 text-richblack-100'>
                <div className={`px-5 transition-all duration-200 rounded-full cursor-pointer py-2 ${selected===ACCOUNT_TYPE.STUDENT?" bg-richblack-900  text-richblack-5": ""}`} 
                onClick={()=>{setSelected(ACCOUNT_TYPE.STUDENT)}} >
                Student</div>


                <div className={`px-5 transition-all duration-200 rounded-full cursor-pointer py-2 ${selected===ACCOUNT_TYPE.STUDENT?"": " bg-richblack-900  text-richblack-5"}`}
                onClick={()=>{setSelected(ACCOUNT_TYPE.INSTRUCTOR)}} > Instructor</div>
            </div>

            {/* firstname lastname */}
            <form className=' rounded-md flex flex-col ' onSubmit={submitHandler}>
            <div className=' flex justify-between gap-8 w-fit mt-3'>
                <div>
                <label className=' text-richblack-5'>First Name<sup className=' text-pink-300'>*</sup></label>
                
                <input required type='text'  name='firstName' value={firstName}   placeholder=' Enter FirstName' className=' bg-richblack-800 pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' onChange={changeHandler}/>
                 
                </div>
                <div>
                <label className=' text-richblack-5'>Last Name<sup className=' text-pink-300'>*</sup></label>
                
                <input required type='text'  name='lastName' value={lastName}   placeholder=' Enter LastName' className=' bg-richblack-800 pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' onChange={changeHandler}/>
                
                </div>
            </div>
                {/* email */}
            <div className=' text-richblack-5 mt-5 text-lg'>Email Address <sup className=' text-pink-300'>*</sup> </div>
            
                <input required type='email'  name='email' value={email}   placeholder=' Enter Email address' className=' bg-richblack-800 pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' onChange={changeHandler}/>
            

            {/* password confirmpassword */}
            <div className='flex justify-between gap-8 mt-5'>
            <div>
            <label className=' text-richblack-5 mt-7 text-lg items-center'>Password <sup className=' text-pink-300'>*</sup> </label>
           
                <input required type={showPassword?"text":"password"} name="password" value={password}   placeholder=' Enter  Password' className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 '  onChange={changeHandler}/>
                <span className=' text-richblack-5 text-2xl absolute -translate-x-7 translate-y-4 cursor-pointer ' onClick={()=>{setShowPassword((prev)=>(!prev))}} >
            {
                    showPassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>
                }
            </span>
          
            </div>
            <div>
            <label className=' text-richblack-5 mt-7 text-lg items-center'>Confirm Password <sup className=' text-pink-300'>*</sup> </label>
            
                <input required type={ConfirmShowPassword?"text":"password"} name="confirmPassword" value={confirmPassword}   placeholder=' Confirm Password' className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 '  onChange={changeHandler}/>
                <span className=' text-richblack-5 text-2xl absolute -translate-x-7 translate-y-4 cursor-pointer ' onClick={()=>{setConfirmShowPassword((prev)=>(!prev))}} >
            {
                ConfirmShowPassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>
                }
            </span>
            
            </div>
            </div>
          

            <Link to="/forgot-password">
                <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                </p>
            </Link>
            
            <button className=' mt-7 bg-yellow-50 w-full text-center p-3 rounded-md text-[16px] ' type='submit'>Sign In</button>
            
           </form>
            
            
            
        </div>
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img
          src={frame}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
        />
        <img
          src={Signupimg}
          alt="Students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 z-10"
        />
        </div>
    </div>
</div>
  )
}

export default Signup