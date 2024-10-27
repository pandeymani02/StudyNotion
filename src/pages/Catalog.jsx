import React from 'react'
import Footer from '../componentss/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {apiConnector} from '../services/apiConnector'
import {categories} from "../services/apis"
import {getCatalogaPageData} from "../services/operations/pageAndCommponentData"
import CourseCard from '../componentss/core/catalog/CourseCard'
import CourseSlider from "../componentss/core/catalog/CourseSlider"
const Catalog = () => {

  const {catalogName}=useParams()
  const [active, setActive] = useState(1)
  const [catalogData,setCatalogData]=useState(null)
  const [categoryId,setCategoryId]=useState("")

  useEffect(()=>{
    const getCategorDetails=async()=>{
      try {
        const res=await getCatalogaPageData(categoryId)
        setCatalogData(res)
      } catch (error) {
        console.log(error)
      }
    }
    if(categoryId){
      getCategorDetails()
    }
  },[categoryId])

  useEffect(()=>{
    const getcategories=async()=>{
      const res=await apiConnector("Get",categories.CATEGORIES_API);
      const category_id=res?.data?.data?.filter((ct)=> ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id
      setCategoryId(category_id)
    }
    getcategories()
  },[catalogName])

  
  return (
    <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogData?.data?.selectedCategory?.course}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogData?.data?.differentCategory?.course}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
  )
}

export default Catalog