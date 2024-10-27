import React from 'react'
import HighlightText from '../componentss/core/HomePage/HighlightText'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import Loginimg from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png"
import { useDispatch } from 'react-redux'
import { login } from '../services/operations/authapi'

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const [formData, setFormData] = useState({email: "",password:"",
      })
    const [showPassword,setShowPassword]=useState(false)
    const changeHandler=(e)=>{
        
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const { email, password } = formData
    const submitHandler=(e)=>{
      e.preventDefault()
      dispatch(login(email,password,navigate))
    }
    
  return (
    <div className=' bg-richblack-900 '>
        <div className='  flex flex-col-reverse lg:flex-row w-10/12 mx-auto  mt-16 items-center justify-between'>
            <div className=' flex flex-col mt-6 w-full lg:w-[35%]'>
                <div className=' text-4xl font-semibold text-richblack-5 font-inter'>Welcome Back</div> 
                <div className=' mt-3 text-richblack-100 text-lg'>Build skills for today, tomorrow, and beyond.</div>
                <i className=' text-lg'><HighlightText text={"Education to future-proof your career."}/></i>
                <div className=' text-richblack-5 mt-5 text-lg'>Email Address <sup className=' text-pink-300'>*</sup> </div>
 
 
 
                <form className=' w-full rounded-md gap-7' onSubmit={submitHandler}>
                  <input required type='email'  name='email' value={email}   placeholder=' Enter Email address' className=' bg-richblack-800 pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 ' onChange={changeHandler}/>
                  

                  <div className=' text-richblack-5 pt-7 text-lg items-center'>Password <sup className=' text-pink-300'>*</sup> </div>
                  
                  <input required type={showPassword?"text":"password"} name="password" value={password}   placeholder=' Enter your Password' className=' bg-richblack-800 relative pl-1 py-4 mt-1 w-full rounded-md shadow shadow-richblack-400 text-richblack-100 '  onChange={changeHandler}/>
                  <span className=' text-richblack-5 text-2xl absolute -translate-x-7 translate-y-5 cursor-pointer ' onClick={()=>{setShowPassword((prev)=>(!prev))}} >
                  {
                          showPassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>
                      }
                  </span>
                  <Link to="/forgot-password">
                   <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                          Forgot Password
                  </p>
                  </Link>
                  <div className=' mt-7' >
                  <button className=' bg-yellow-50 w-full text-center p-3 rounded-md text-[16px]' type='submit'>Sign In</button>
                  </div>
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
              src={Loginimg}
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

export default Login