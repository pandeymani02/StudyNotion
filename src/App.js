import React from 'react';
import { Route,Routes} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from "./componentss/common/Navbar"
import UpdateePassword from './pages/UpdateePassword';
import VerifyEmail from './pages/VerifyEmail';
import { ACCOUNT_TYPE } from './utils/constants';
import About from './pages/About';
import DashBoarad from './pages/DashBoarad';
import MyProfile from './componentss/core/dashboard/MyProfile';
import PrivateRoute from './componentss/core/auth/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
import EnrolledCourses from "./componentss/core/dashboard/EnrolledCourses"
import Cart from './componentss/core/dashboard/cart';
import { useSelector } from 'react-redux';
import ContactUs from './pages/ContactUs';
import Settings from './pages/Settings';
import "./App.css"
import AddCourse from './componentss/core/dashboard/AddCourse';
import MyCourses from './componentss/core/dashboard/MyCourses';
import EditCourse from './componentss/core/dashboard/Edit Course';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VedioDetails from './componentss/core/viewCourse/VedioDetails';
import Instructor from './componentss/core/dashboard/InstructorDashboard/Instructor';
const App=()=>{
  const {user}=useSelector((state)=>state.profile)
  return (
    <div className=' w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='/courses/:courseId' element={<CourseDetails/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route> 
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdateePassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route element={
        <PrivateRoute> <DashBoarad/></PrivateRoute>
         }>
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='/dashboard/settings' element={<Settings/>}/>
          
          {
            user?.accountType=== ACCOUNT_TYPE.STUDENT&&(
              <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              <Route path='/dashboard/cart' element={<Cart/>}/>
              </> 
            )
          }

          {
            user?.accountType=== ACCOUNT_TYPE.INSTRUCTOR&&(
              <>
              <Route path='/dashboard/add-course' element={<AddCourse/>}/>
              <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='/dashboard/instructor' element={<Instructor/>}/>
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>

              
              </> 
            )
          }

        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute> }>
          {
            user?.accountType===ACCOUNT_TYPE.STUDENT&&(
              <>
                <Route  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VedioDetails/>}></Route>
              </>
            )
          }
        </Route>
      
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;