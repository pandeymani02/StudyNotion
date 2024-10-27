import React from 'react'
const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];
const Statsomponent = () => {
  return (
    <div className=' flex justify-around text-center'>
        {Stats.map((stat, index) =>{
            return(
                <div key={index}>
                <h1 className=' text-3xl text-richblack-5 font-bold'>{stat.count}</h1>
                <p className=' text-richblack-300'>{stat.label}</p>
                 </div>
            )
        }
        )}
    </div>
  )
}

export default Statsomponent