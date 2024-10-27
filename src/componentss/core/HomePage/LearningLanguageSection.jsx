import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import  PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CtaButton from './Button'

const LearningLanguageSection = () => {
  return (
    <div className=' mt-[100px]'>
        <div className=' flex flex-col  gap-5 items-center'>
            <div className=' text-4xl font-semibold text-center'>
                your Swiss knife for
                <HighlightText text={" learning any language"}/>
            </div>

            <div className=' text-center text-richblack-600 mx-auto text-base font-medium width-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <p>progress tracking, custom schedule and more.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <img
                src={knowYourProgress}
                alt=""
                className="object-contain  lg:-mr-32 "
              />
              <img
                src={compareWithOthers}
                alt=""
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <img
                src={PlanYourLessons}
                alt=""
                className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
              />
            </div>

            <div  className=" w-fit mb-[90px] ">
                <CtaButton active={true} linkto={"/signup"} shad={false}>
                    <div>Learn More</div>
                </CtaButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection