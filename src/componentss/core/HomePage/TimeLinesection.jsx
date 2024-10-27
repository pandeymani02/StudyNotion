import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from "../../../assets/Images/TimelineImage.png"
const timeline=[
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully Commited to the success of company"

    },
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"

    },
    {
        logo:logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"

    },
    {
        logo:logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]
const TimeLinesection = () => {
  return (
    // <div>
    //    <div className=' flex flex-col lg:flex-row gap-15 items-center '>
    //         <div className=' lg:w-[45%] mb-4 flex flex-col gap-5'>
    //             {
    //                 timeline.map((element,index)=>{
    //                     return(
    //                         <div className=' flex flex-row gap-6 'key={index}>
    //                             <div className=' w-[50px] h-[50px] bg-white flex items-center'>
    //                                 <img src={element.logo}></img>
    //                             </div>
    //                             <div>
    //                                 <h2 className=' font-semibold text-[18px]'>{element.heading}</h2>
    //                                 <p className=' text-base'>{element.description}</p>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    //         <div className=' relative shadow-blue-200'>
    //        <img src={timelineimage} className=' shadow-white object-cover h-fit'/>

    //        <div className=' absolute  bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 translate-x-[20%] translate-y-[-50%] '>
    //             <div className=' flex gap-5  items-center border-r border-caribbeangreen-300 px-7'>
    //                 <div className=' text-3xl font-bold'>
    //                     10
    //                 </div>
    //                 <div className=' text-sm text-caribbeangreen-300'>Years of 
    //                 <div>Experience</div></div>
    //             </div>
    //             <div className=' flex gap-5 items-center px-7'>
    //             <div className=' flex text-3xl font-bold'>
    //                     250
    //                 </div>
    //                 <div className=' text-sm text-caribbeangreen-300'>Types of <p>Courses</p></div>
    //             </div>

    //        </div>

    //    </div>
    //    </div> 
       
    // </div>
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
          {timeline.map((ele, i) => {
            return (
              <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
                    <p className="text-base">{ele.description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    timeline.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={timelineimage}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  )
}

export default TimeLinesection