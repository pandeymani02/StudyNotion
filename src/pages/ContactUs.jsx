import React from 'react'
import {BsFillChatRightTextFill} from "react-icons/bs"
import { FaGlobeAmericas} from "react-icons/fa"
import {AiFillPhone} from "react-icons/ai"
import ContactFormSection from '../componentss/core/about/ContactFormSection'
import Footer from '../componentss/common/Footer'
const ContactUs = () => {
  return (
    <div>
        <div className=' pb-10 justify-between flex lg:flex-row flex-col mx-auto w-10/12 min-h-[calc(100vh-3.5 rem)] mt-24'>
        <div className=' h-fit lg:w-[35%] rounded-xl bg-richblack-800 p-6'>
            <div className=' flex flex-col text-richblack-200'>
                <p className=' flex gap-x-2 items-center text-xl text-richblack-5'><span><BsFillChatRightTextFill/> </span> Chat on us</p>
                <p >Our friendly team is here to help.</p>
                <p>info@studynotion.com</p>
            </div>
            <div className=' mt-6 flex flex-col text-richblack-200'>
                <p className=' flex gap-x-2 items-center text-xl text-richblack-5'><span><FaGlobeAmericas/> </span> Visit us</p>
                <p >Come and say hello at our office HQ.</p>
                <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
            </div>
            <div className=' mt-6   flex flex-col text-richblack-200'>
                <p className=' flex gap-x-2 items-center text-xl text-richblack-5'><span className=''><AiFillPhone/> </span> Chat on us</p>
                <p >Mon - Fri From 8am to 5pm</p>
                <p>+123 456 7869</p>
            </div>
        </div>
        <div className=' border p-12 lg:mt-0 mt-10 rounded-xl border-richblack-700 lg:w-[60%]'>
            <ContactFormSection cont={true}/>
        </div>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  )
}

export default ContactUs