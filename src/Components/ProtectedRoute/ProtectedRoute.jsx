import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticatedUser, isLoading } = useAuthContext()
    console.log(isAuthenticatedUser)
    
    return isAuthenticatedUser ? <Outlet /> : <Navigate to='/login' />

}

export default ProtectedRoute
