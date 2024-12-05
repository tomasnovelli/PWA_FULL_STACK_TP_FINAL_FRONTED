import React, { useEffect, useState } from 'react'
import { GET, getAuthenticatedHeaders } from '../Helpers/http.fetching'
import ENVIROMENT from '../Enviroment/enviroment'

const useGetConversation = (contact_id) => {
    const [conversation, setConversation] = useState([])
    const [isLoadingConversation, setIsLoadingConversation] = useState(true)
    const [conversationError, setConversationError] = useState('')

    const getConversation = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/messages/conversation/${contact_id}`, {
            headers: getAuthenticatedHeaders()
        })
        setIsLoadingConversation(false)

        if(response.ok){
            console.log({response})
            setConversation(response.payload.conversation)
        }
    }

    useEffect(
        () => {
            getConversation()
        },
        []
    )

    return {
        conversation,
        conversationError,
        isLoadingConversation
    } 
}

export default useGetConversation