import React, { useState } from 'react'
import { sidebarLinks} from "../../../data/dashboard-links"

import { VscSignOut } from 'react-icons/vsc'
import{logout} from "../../../services/operations/authapi"
import SideBarLink from "./SideBarLink"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'
const SideBar = () => {
    const{user,loading:profileLoading}=useSelector((state=> state.profile));
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmation,setConfirmation]=useState(null)

    if(authLoading||profileLoading){
        return (
            
            <div className=' mt-10'>loading</div>
    )}

    return(

       
            <div>
                <div className=' flex min-w-[222px] text-richblack-100  flex-col border-r-[1px] border-richblack-700  h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 '>
                    <div className=' flex flex-col'>
                    {
                    sidebarLinks.map((link,index)=>{
                        if(link.type && user?.accountType !==link.type) return null;
                        return(
                            <SideBarLink key={link.id} link={link} iconName={link.icon}/>

                        )
                    })
                    }

                    </div>


                    <div className=' mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>


                    <div className=' flex flex-col'>
                        <SideBarLink link={{name:"Settings", path:"/dashboard/settings"}}
                            iconName="VscSettingsGear"
                        />

                        <button onClick={()=>setConfirmation({
                            text1:"Are You Sure ?",
                            text2:"You will be logged out of your account.",
                            btn1Text:"Logout",
                            btn2Text:"cancel",
                            btn1Handler:()=>dispatch(logout(navigate)),
                            btn2Handler:()=> setConfirmation(null)
                        })}
                        className=' text-sm font-medium text-richblack-100'>

                            <div className=' pl-8 flex items-center gap-x-2'>
                                <VscSignOut className=' text-lg'/>
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                
                </div>
            {confirmation &&<ConfirmationModal modalData={confirmation}/> }
            </div>
        
    )

}

export default SideBar