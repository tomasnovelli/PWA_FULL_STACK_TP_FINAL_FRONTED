import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticatedUser, isLoading } = useAuthContext()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isAuthenticatedUser ? <Outlet /> : <Navigate to='/login' />

}

export default ProtectedRoute
