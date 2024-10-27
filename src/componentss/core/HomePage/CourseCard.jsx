import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    
        
        // <div className={`${currentcard===cardData.heading ?" bg-white shadow-[10px_10px_0px_0_rgba(255,214,10,1)]":" bg-richblack-800"} cursor-pointer`} onClick={()=>{
        //   setCurrentcard(cardData.heading)
        // }}>
        // <div className='  flex flex-col px-6 pt-8  w-full   '>
        //   <div className={` text-xl font-semibold ${currentcard===cardData.heading ?" text-richblack-800":" text-richblack-5"} `}>{cardData?.heading}</div>
        //   <div className=' font-inter text-richblack-500 mt-3'>{cardData.description}</div>
            
        // </div>
        // <div className={`flex justify-between border-t-2 border-dashed p-4 mt-16 ${currentcard===cardData.heading?" border-richblack-50  text-blue-500":" border-richblack-600 text-richblack-300"}`}>
        //     <div className='flex items-center gap-1'><HiUsers/> {cardData.level}</div>
        //     <div className='flex items-center gap-1'><ImTree/> {cardData.lessionNumber}</div>
        //   </div>
        //   </div>
        <div
      className={`w-[360px]  ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
        
  
  )
}

export default CourseCard