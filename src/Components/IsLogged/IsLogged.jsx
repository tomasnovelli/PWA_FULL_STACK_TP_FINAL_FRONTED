import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const IsLogged = () => {
    const { isAuthenticatedUser, user_info } = useAuthContext()

    return (
        !isAuthenticatedUser ? <Outlet /> : <Navigate to={`/contacts/${user_info.id}`} />
    )
}

export default IsLogged
