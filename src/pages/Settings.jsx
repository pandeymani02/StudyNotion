import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import DeleteAccount from '../componentss/core/settings/DeleteAccount'
import { imageUpload } from '../services/operations/SettingsApi'
import { FiUpload } from "react-icons/fi"
import ProfileUpdation from '../componentss/core/settings/ProfileUpdation'
import IconBtn from '../componentss/common/IconBtn'
import UpdatePasswoed from '../componentss/core/settings/UpdatePasswoed'
const Settings = () => {
    const{user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const [imgFile,setImgFile]=useState(null)
    const [loading, setLoading] = useState(false)
    const [previewSource, setPreviewSource] = useState(null)
    const fileInputRef = useRef(null)

    const handleClick=()=>{
        fileInputRef.current.click()
    }
    const imgChange= (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
          setImgFile(file)
          previewFile(file)
        }
      }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
      }

      const handleFileUpload=()=>{
        setLoading(true)
        try {
            const formData= new FormData
            formData.append('displayPicture',imgFile)
            dispatch(imageUpload(formData,token))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
        setLoading(false)
      }

      useEffect(()=>{
        if(imgFile){
            previewFile(imgFile);
        }
      },[imgFile])

  return (
    <div className=' mx-auto'>
        <h1 className=' text-4xl text-richblack-5'>Edit Profile</h1>
        <div className=' bg-richblack-800  items-center gap-x-6 mt-16 flex rounded-md p-6'>
            <div>
            <img src={previewSource||user?.image} alt={`profile-${user?.firstName}`}
                    className=" aspect-square w-[78px] rounded-full object-cover"/>
            </div>
            <div className=' flex flex-col'>
                <p className=' text-richblack-5 mb-3'>Change Profile Picture</p>
                <div className=' flex gap-x-6'>
                <input  type="file"
                ref={fileInputRef}
                onChange={imgChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"/>
                <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
                </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
                </div>
            </div>
        </div>

        {/* section2 */}
        <div className='bg-richblack-800   mt-6  rounded-md p-6'>
            <ProfileUpdation/>
        </div>

        {/* section 3 */}
        <div className='bg-richblack-800   mt-6  rounded-md p-6'>
            <UpdatePasswoed/>
        </div>

        {/* section4 */}
        <div>
            <DeleteAccount/>
        </div>
    </div>
  )
}

export default Settings