import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
const PrivateRoute = ({children}) => {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
  
    if(token!==null)
    return children
    else
    return navigate('/login')
}

export default PrivateRoute