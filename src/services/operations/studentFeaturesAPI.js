import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";


const RAZORPAY_KEY="rzp_test_D621jTSBmVxe4n"
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API  }= studentEndpoints

function loadScript(src){
    return new Promise((resolve) => {
    const script=document.createElement("script")
    script.src=src

    script.onload=()=>{
        resolve(true)
    }
    script.onerror=()=>{
        resolve(false)
    }
    document.body.appendChild(script);
    })
}


export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("...Loading")
   
    try {
        const res =await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay SDK failed")
            return
        } 
        const orderResponse=await apiConnector("POST", COURSE_PAYMENT_API, 
        {courses},
        {
            Authorisation: `Bearer ${token}`,
        })

                    if(!orderResponse.data.success){
                        throw new Error(orderResponse.data.message)
                    }
                    
                    const options = {
                        key:RAZORPAY_KEY,
                        currency: orderResponse.data.message.currency,
                        amount: `${orderResponse.data.message.amount}`,
                        order_id:orderResponse.data.message.id,
                        name:"StudyNotion",
                        description: "Thank You for Purchasing the Course",
                        image:rzpLogo,
                        prefill: {
                            name:`${userDetails.firstName}`,
                            email:userDetails.email
                        },
                        handler: function(response) {
                            //send successful wala mail
                            sendPayementSuccessEmail(response, orderResponse.data.message.amount,token );
                            //verifyPayment
                            console.log(response)
                            verifyPayement({...response, courses}, token, navigate, dispatch);
                        }
                    }
                    console.log(orderResponse)
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                    paymentObject.on("payment.failed", function(response) {
                        toast.error("oops, payment failed");
                        console.log(response.error);
                    })

    } catch (error) {
        console.log("PAYEMENT API ERROR",error)
        toast.error("Could Not Make payement")
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

async function sendPayementSuccessEmail(response,amount,token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            payementId:response.razorpay_payment_id,
            amount
        },{Authorisation: `Bearer ${token}`})
    } catch (error) {
        console.log("PAYEMENT SUCCES EMAIL ERROR",error)
    }
}

async function verifyPayement(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payement...")
    dispatch(setPaymentLoading(true));
    try {
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,
            {Authorisation: `Bearer ${token}`}
        )
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.success)
        }

        toast.success("Payement Succeful, You are Added")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("PAYEMENT Verification ERROR",error)
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false));
}