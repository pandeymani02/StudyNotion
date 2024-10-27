import React from 'react'
import HighlightText from '../HomePage/HighlightText'
const Quote = () => {
  return (
    <div className=' text-center'>
    
     <sup>"</sup>   We are passionate about revolutionizing the way we learn. Our  innovative platform
        <HighlightText text={"combines technology"}/>,
        <span className='text-transparent bg-clip-text bg-gradient-to-br from-[#FF512F] to-[#F9D423]'>
        {" "} expertise
        </span>
        , and community to create an
        <span className=' text-transparent bg-clip-text bg-gradient-to-br from-[#FF512F] to-[#F9D423]'>{" "} unparalleled educational experience.
        <sup>"</sup>
 </span>
    </div>
  )
}

export default Quote