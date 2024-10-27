import {settingsEndpoints} from "../apis"
import {  toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../Slices/ProfileSlice"
import { logout } from "./authapi"
const{
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API

}=settingsEndpoints
 export function imageUpload(formdata,token){
    return async(dispacth)=>{
        const toastId=toast.loading("...loading")
        try {
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
              })
              console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
              )
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispacth(setUser(response.data.data))
            toast.success("Display Picture Updated")
        } catch (error) {
            console.log(error)
            toast.error("Error in Updating Display Picture")
        }
        toast.dismiss(toastId)
    }
 }

 export function updateProfile(token,data){
    return async (dispatch)=>{
        const toastId = toast.loading('Loading...')
        try {
            console.log("uwu")
            const response=await apiConnector("PUT",UPDATE_PROFILE_API,data,{
                Authorisation: `Bearer ${token}`,
            })
            console.log("uwu")
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")   
        }
        toast.dismiss(toastId)
    }
 }

 export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }

  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API,null, {
          Authorisation: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }