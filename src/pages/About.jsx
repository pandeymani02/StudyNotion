import React from 'react'
import HighlightText from '../componentss/core/HomePage/HighlightText'
import bannerImg1 from "../assets/Images/aboutus1.webp"
import bannerImg2 from "../assets/Images/aboutus2.webp"
import bannerImg3 from "../assets/Images/aboutus3.webp"
import fstryImg from "../assets/Images/FoundingStory.png"
import Quote from '../componentss/core/about/Quote'
import Statsomponent from '../componentss/core/about/Statsomponent'
import LearningGrid from '../componentss/core/about/LearningGrid'
import ContactFormSection from '../componentss/core/about/ContactFormSection'
import Footer from '../componentss/common/Footer'
import InstructorSection from '../componentss/core/HomePage/InstructorSection';
import ReviewSlider from '../componentss/common/ReviewSlider'
const About = () => {
  return (
    <div className=' text-richblack-5 w-full ' >
    {/* section-1 */}
        <section className=' bg-richblack-700 flex flex-col text-center'>
            <div className='w-10/12  mx-auto pt-[100px]'>
               <div className=' lg:w-7/12 mx-auto'>
               <header className=' text-4xl font-semibold'>
                Driving Innovation in Online Education for a 
                <HighlightText text="Brighter Futue"/>
                </header>
                <p className=' text-richblack-300 mt-4'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
               </div>
                <div className=' grid grid-cols-3 translate-y-14  gap-8 '>
                  <img src={bannerImg1} />
                  <img src={bannerImg2}/>
                  <img src={bannerImg3}/>
                </div>
            </div>
        </section>

            {/* Section 2 */}

       <section>
          <div className='w-10/12 mx-auto mt-28 font-semibold text-4xl text-richblack-100'>
            <Quote/>
          </div>
        </section>
    

    <hr className=' w-full text-richblack-700 my-24'></hr>
        {/* section 3 */}

        <section>
          <div className=' mx-auto w-10/12 flex lg:flex-row flex-col justify-between  items-center'>
             <div className=' lg:w-[40%]  flex-col '>
                <div className='  text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] to-[#FD1D1D] font-semibold text-3xl'>
                Our Founding Story
                </div>
                <p className=' text-richblack-100 mt-8'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p className='text-richblack-100 mt-4'> As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
             </div>
             <div className='  lg:w-[40%] lg:pt-0 pt-24 '>
                <img src={fstryImg}/>
             </div>
          </div>
        </section>


        {/* Section 4 */}

        <section className=' mt-[180px] w-10/12 mx-auto flex lg:flex-row flex-col justify-between'>
          <div className=' lg:w-[40%]' >
            <div  className='text-transparent bg-clip-text bg-gradient-to-br from-[#E65C00] to-[#F9D423] font-semibold text-3xl'>Our Vision</div>
            <p className=' text-richblack-100 mt-10'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className=' lg:w-[40%] lg:mt-0 mt-24'>
            <div className=' text-3xl font-semibold'><HighlightText text={"Our Mission"} /></div>
            <p className=' text-richblack-100 mt-10'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
        </section>


        {/* section 5 */}

        <section className=' bg-richblack-800 mt-24'>
          <div className=' py-24 px-32'><Statsomponent/></div>
        </section>

        {/* section 6 */}

        <section>
          <LearningGrid/>
        </section>


        {/* section-7 */}
        <section  className=' mx-auto items-center lg:w-5/12 w-10/12 gap-5 mt-[90px] mb-[140px]'>
          <ContactFormSection cont={false}/>
        </section>

        <div className=' w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter:uppercase bg-richblack-900 text-white'>
            <InstructorSection/>
            <h2 className=' text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>
            <ReviewSlider />
    </div>

        <section>
          <Footer/>
        </section>
    
  

    </div>
  )
}

export default About