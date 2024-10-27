import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className=' font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#1FA2FF] to-[#12D8FA,#A6FFCB]'>
    {" "}
        {text}
    </span>
  )
}

export default HighlightText