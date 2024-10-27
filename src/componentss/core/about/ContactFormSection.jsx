import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'
const ContactFormSection = (cont) => {
  return (
    <div className=' flex flex-col'>
        <h1 className=' font-bold text-center text-4xl text-richblack-5 '>{cont ===false?(<div>Get In Touch</div>):(<div>Got a Idea? We've got the skills. Let's team up</div>)}</h1>
        <div className='text-center text-richblack-100'>{cont ===false?(<div>We'd love to here for you, Please fill out this form.</div>):(<div>Got a Idea? We've got the skills. Let's team up</div>)}</div>
        <div className=' mt-8 text-richblack-5'><ContactUsForm/></div>
    </div>
  )
}

export default ContactFormSection