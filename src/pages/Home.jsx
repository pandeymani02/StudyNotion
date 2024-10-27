import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import HighlightText from '../componentss/core/HomePage/HighlightText';
import CtaButton from '../componentss/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../componentss/core/HomePage/CodeBlocks';
import "../App.css"
import TimeLinesection from '../componentss/core/HomePage/TimeLinesection';
import LearningLanguageSection from '../componentss/core/HomePage/LearningLanguageSection';
import InstructorSection from '../componentss/core/HomePage/InstructorSection';
import ExploreMore from "../componentss/core/HomePage/ExploreMore";
import Footer from "../componentss/common/Footer"
import ReviewSlider from '../componentss/common/ReviewSlider';
const Home = () => {
  return (
    <div>
        {/* section 1 */}
    <div className=' relative mx-auto flex flex-col w-11/12 items-center text-white justify-center max-w-maxContent'>

        <Link to={"/signup"}>
        <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 '>
            <div className=' flex flex-row items-center rounded-full px-10 py-[5px] group-hover:bg-richblack-900 trasition-all duration-200 gap-2'>
                <p>Become an Instructor</p>
                <FaArrowRight/>
            </div>
        </div>
        </Link>

        <div className=' text-center text-4xl mt-[38px] font-semibold'>
         Empower Your Future with <HighlightText text={"Coding Skills"}/>
         </div>

         <div className=' w-[90%] text-center text-lg font-bold text-richblack-300 mt-[18px] blue '>
         With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
         </div>
         <div className=' flex flex-row gap-7 mt-8'>
            <CtaButton active={true} linkto={"signup"} shad={true}> Learn More</CtaButton>
            <CtaButton active={false} linkto={"login"} shad={true}>Book a Demo</CtaButton>
         </div>
                                                                                                 
         <div className=' max-w-[680px] mx-3  my-14  shadow-[10px_10px_0px_0_rgba(255,255,255,255),-10px_-10px_10px_0px_rgba(0,51,102,1)] '>
            <video muted loop autoPlay>
                <source src={Banner} />
            </video>
         </div>

         {/* CodeSection1 */}

         <div>
            <CodeBlocks position={"lg:flex-row"} heading={
                <div className=' text-4xl font-semibold'> Unlock your <HighlightText text={"Coding potential"}/>  with our  online courses.</div>
            }
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={{btnText:"try it yourself" ,linkto:"/signup",active:true}}
                ctabtn2={{btnText:"learn More" ,linkto:"/login",active:false}}
                codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle> <link rel="stylesheet" href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><a href="two/">Two</\na><ahref="three/">Three</a>\n/nav>'`}
                codecolor={"text-yellow-25"}
                arrow={true}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
         </div>

         {/* codeSection 2 */}
         <div>
            <CodeBlocks position={"lg:flex-row-reverse"} heading={
                <div className=' text-4xl font-semibold'>Start <HighlightText text={"coding in seconds"}/></div>
            }
                subHeading={ "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={{
                btnText: "Continue Lesson",
                link: "/signup",
                active: true,
                }}
                ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
                }}
                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                codecolor={"text-white"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
         </div>

         
        
        <ExploreMore/>

    </div>

        {/* section 2 */}

    <div className=' bg-pure-greys-5  text-richblack-700 '>
        <div className='background-[bghome] h-[333px] flex homepage_bg '>
            <div className=' w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-center '>
                <div className=' flex flex-row gap-7 mt-12 text-white'>
                <CtaButton active={true} linkto={"/signup"} shad={false}>
                    <div className='flex  items-center gap-3'>
                        Explore Full Catalog
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CtaButton>
                <CtaButton active={false} linkto={"/signup"} shad={false}>
                    <div className='flex items-center gap-3'>
                        Learn More
                    </div>
                </CtaButton>

                </div>
            </div>

        </div>

        <div className=' mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between  gap-7 '>
            <div className=' flex flex-col lg:flex-row w-full gap-5  mt-[90px] mb-10'>
                <div className=' text-4xl  font-semibold lg:w-[45%]'>Get the skills you need for a <HighlightText text={" job that is in demand."}/>   </div>
                <div className=' flex flex-col lg:w-[45%] gap-10 items-start'>
                    <div className=' text-[16px]'> The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                    <CtaButton active={true} linkto={"/signup"} shad={false}> Learn More</CtaButton>
                </div>

            </div>
            <TimeLinesection/>
        <LearningLanguageSection/>
        </div>

       

    </div>

        {/* section 3 */}
    <div className=' w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter:uppercase bg-richblack-900 text-white'>
            <InstructorSection/>
            <h2 className=' text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>
            <ReviewSlider />
    </div>
        



        {/* footer */}
        <Footer />
    </div>
  )
}

export default Home