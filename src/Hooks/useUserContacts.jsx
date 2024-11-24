import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../Helpers/http.fetching"
import ENVIROMENT from "../Enviroment/enviroment"


const useUserContacts = (user_id) => {
    const [contactList, setContactList] = useState([])
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)
    const getUserContacts = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/contacts/${user_id}`, {
            headers: getAuthenticatedHeaders()
        })
        console.log({response})
        if (response.ok && response.payload.contacts.length === 0) {
            setContactList(response.payload.contacts)
            setIsLoadingContacts(false)
        }
    }
    useEffect(
        () => {
            getUserContacts()
        },
        []
    )
    return { contactList, isLoadingContacts }
}

export default useUserContacts