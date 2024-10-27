import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../componentss/core/dashboard/SideBar';
import { Outlet } from 'react-router-dom';
const DashBoarad = () => {
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(authLoading,profileLoading){
  return (
    
    <div className=' mt-10'>loading</div>
  )}
  return(
    <div className=' relative  flex  min-h-[calc(100vh-3.5rem)] '>
        <SideBar/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto '>
         <div className=' mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
         </div>

        </div>
     
    </div>
  )
}

export default DashBoarad