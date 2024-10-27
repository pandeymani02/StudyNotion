import { setLoading } from "../../Slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis"
import { toast } from "react-hot-toast";
import { setToken } from "../../Slices/authSlice";
import { setUser } from "../../Slices/ProfileSlice";
import {profileEndpoints} from "../apis"
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

const{GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API}=profileEndpoints


export function sendOtp(email,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        const toastId= toast.loading("...loading");

        try {
            const response=await apiConnector("POST",SENDOTP_API,{email, checkUserPresent: true,
            });
            console.log(response);
            
            if(!response.data.success){
                throw new Error(response.data.success)
            }
            toast.success("otp Sent Succesfully")
            navigate("/verify-email")

        } catch (error) {
            console.log("otp send error")
            console.log(error.message)
            toast.error("Otp Sent Failed")
        } 
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function signup(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true))
         const ToastId=toast.loading("...loading");
        try {
         const response=await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp})
        console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("Sign Up Successfully")
          navigate('/login')
        } catch (error) {
            console.log(error.message)
            toast.error("signUp failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(ToastId)
    }
}

export  function login(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        try {
            const response=await apiConnector("POST",LOGIN_API,{email,password});
            console.log(response)
            if(!response.data.success){
                throw new Error(response.data.success)
            }
            
            dispatch(setToken(response.data?.token))

            const userImage=response.data.user.image?response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user,image:userImage}));
            
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem('user',JSON.stringify(response.data.user))
            navigate('/dashboard/my-profile')

            toast.success("User Logged In")

        } catch (error) {
            console.log("Login Api error")
            console.log(error.message)
            toast.error("Login Failed")
        } 
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }  

}

export function logout(navigate){
    return  (dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
    }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email})
           
            console.log(response);
            if(!response.data.success){
                
                throw new Error(response.data.success)
            }
           
            toast.success("Reset Email Sent");
            setEmailSent(true);

        } catch (error) {
            console.log("Reset password tokken error",error.message)
            toast.error("Reset Email error");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function resetPassword(password,cofirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId=toast.loading("loading...")
        try {
            const response=await apiConnector("POST",RESETPASSWORD_API,{password,cofirmPassword,token});
            console.log(response)

            if(!response.data.success){
                throw new Error(response.data.success)
            }
            toast.success("Reset Successfully")
        } catch (error) {
            console.log("Reset password  error",error.message)
            toast.error("Reset password error");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


