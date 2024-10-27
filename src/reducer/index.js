import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import ProfileSlice from "../Slices/ProfileSlice"
import cartSlice from "../Slices/cartSlice"
import courseSlice from "../Slices/courseSlice"
import viewCourseSlice from "../Slices/viewCourseSlice"
const rootReducer=combineReducers({
    auth:authReducer,
    profile:ProfileSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice
})

export default rootReducer