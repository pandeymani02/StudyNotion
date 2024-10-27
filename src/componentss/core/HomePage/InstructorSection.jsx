import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className=' flex flex-col lg:flex-row gap-20 items-center  mt-16'>
        <div className=' lg:w-[50%] shadow-[-10px_-10px_0px_0_rgba(255,255,255,255)]'>
            <img src={instructor} alt='Instructor'/>
        </div>
        <div className=' lg:w-[50%] flex flex-col gap-10'>
            <div className=' text-4xl font-semibold w-[50%]'>
                Beacome an <HighlightText text={"Instructor"}/>
            </div>
            <p className=' font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className=' w-fit'>
            <Button active={true} linkto={"/signup"} shad={true}>
               <div className=' flex gap-2 items-center ' >
               Start Learning Today <FaArrowRight/>
               </div>
            </Button>
            </div>
           
        </div>
    </div>
  )
}

export default InstructorSection