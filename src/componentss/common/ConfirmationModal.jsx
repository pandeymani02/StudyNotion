import React from 'react'
import IconBtn from './IconBtn'
import CtaButton from '../core/HomePage/Button'
const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto  bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className=' bg-richblack-900 border p-8 rounded-md border-richblack-500 text-richblack-5'>
            <p className=' text-2xl font-semibold'>
                {modalData.text1}
            </p>
            <p className=' text-richblack-100'>
                {modalData.text2}
            </p>
            <div className=' flex justify-between mt-2'>
                <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} customClasses=" bg-yellow-50 text-black text-center text-[13px] px-6 py-3 rounded-md font-bold  hover:scale-95 transition-all duration-200"/>
                <IconBtn  onclick={modalData?.btn2Handler}
                    text={modalData?.btn2Text} customClasses="bg-richblack-600 text-richblack  text-center text-[13px] px-6 py-3 rounded-md font-bold  hover:scale-95 transition-all duration-200"></IconBtn>
            </div>

        </div>
    </div>
  )
}

export default ConfirmationModal