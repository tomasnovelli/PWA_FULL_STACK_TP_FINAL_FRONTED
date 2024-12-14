import { useEffect, useState } from 'react'
import { GET, getAuthenticatedHeaders } from '../Helpers/http.fetching'
import ENVIROMENT from '../Enviroment/enviroment'
import { useGlobalContext } from '../Components/GlobalContext/GlobalContext'

const useGetUserProfileData = (user_id) => {
    
    const { currentUserProfileData, setCurrentUserProfileData } = useGlobalContext()

    const [userErrors, setUserErrors] = useState('')
    const [isLoadingData, setIsLoadingData] = useState(true)
    const getUserProfileData = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/user/profile/${user_id}`, {
            headers: getAuthenticatedHeaders()
        })
        if (!response.ok) {
            setUserErrors(response.payload.message)
        }
        else {
            setCurrentUserProfileData(response.payload.user)
            setIsLoadingData(false)
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
            userErrors,
            isLoadingData
        }
}

export default useGetUserProfileData
