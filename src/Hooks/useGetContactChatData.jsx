import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../Helpers/http.fetching"
import ENVIROMENT from "../Enviroment/enviroment"

const useGetContactChatData = (contact_id) => {
    
    const [contactChatData, setcontactChatData] = useState(null)
    const [contact_data_loading, set_contact_data_loading] = useState(true)
    const [contact_data_error, set_contact_data_error] = useState(null)
    
    const getContactData = async (contact_id) => {
        
        const contactDataResponse = await GET(`${ENVIROMENT.URL_BACKEND}/api/contact/chat/${contact_id}`, {
            headers: getAuthenticatedHeaders()
        })
        
        set_contact_data_loading(false)
        if (contactDataResponse.ok) {
            setcontactChatData(contactDataResponse.payload.contact)
        }
        else {
            set_contact_data_error(contactDataResponse.message)
        }
    }
    useEffect(
        () => {
            getContactData(contact_id)
        },
        []
    )
    
    return {
        contactChatData,
        contact_data_loading,
        contact_data_error
    }

}

export default useGetContactChatData