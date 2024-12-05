import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../Helpers/http.fetching"
import ENVIROMENT from "../Enviroment/enviroment"
import { useGlobalContext } from "../Components/GlobalContext/GlobalContext"


const useUserContacts = (user_id) => {
    /* const [contactList, setContactList] = useState([]) */
    const {contactListData, setContactListData} = useGlobalContext()
    console.log(contactListData)
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)
    const getUserContacts = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/user/contacts/${user_id}`, {
            headers: getAuthenticatedHeaders()
        })
        console.log({response})
        if (response.ok){
            setContactListData(response.payload.contacts)
            setIsLoadingContacts(false)
        }
    }
    useEffect(
        () => {
            getUserContacts()
        },
        []
    )
    return { isLoadingContacts}
}

export default useUserContacts