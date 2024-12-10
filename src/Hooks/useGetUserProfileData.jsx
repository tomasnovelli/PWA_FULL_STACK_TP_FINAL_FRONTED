import React, { useEffect, useState } from 'react'
import { GET, getAuthenticatedHeaders } from '../Helpers/http.fetching'
import ENVIROMENT from '../Enviroment/enviroment'

const useGetUserProfileData = (user_id) => {
    
    const [currentUserProfileData, setCurrentUserProfileData] = useState({})
    const [userErrors, setUserErrors] = useState('')
    const getUserProfileData = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/user/profile/${user_id}`, {
            headers: getAuthenticatedHeaders()
        })
        if (!response.ok) {
            setUserErrors(response.payload.message)
        }
        else {
            setCurrentUserProfileData(response.payload.user)
        }
    }
    useEffect(
        () => {
            getUserProfileData()
        },
        []
    )
    return {
        currentUserProfileData,
        userErrors
    }
}

export default useGetUserProfileData
