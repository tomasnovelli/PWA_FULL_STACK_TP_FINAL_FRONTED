import { useEffect, useState } from 'react'
import { GET, getAuthenticatedHeaders } from '../Helpers/http.fetching'
import ENVIROMENT from '../Enviroment/enviroment'
import { useGlobalContext } from '../Components/GlobalContext/GlobalContext'

const useGetConversation = (contact_id) => {

    const { conversation, setConversation } = useGlobalContext()
    const [isLoadingConversation, setIsLoadingConversation] = useState(true)
    const getConversation = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/messages/conversation/${contact_id}`, {
            headers: getAuthenticatedHeaders()
        })
        setIsLoadingConversation(false)
        if (response.ok) {
            setConversation(response.payload.conversation)
        }
    }
    useEffect(
        () => {
            getConversation()
            const interval = setInterval(getConversation, 3000)
            return () => clearInterval(interval)
        },
        []
    )
    
    return {
        conversation,
        isLoadingConversation
    }
}

export default useGetConversation