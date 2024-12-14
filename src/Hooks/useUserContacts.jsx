import { useEffect, useState } from "react"
import { GET, getAuthenticatedHeaders } from "../Helpers/http.fetching"
import ENVIROMENT from "../Enviroment/enviroment"
import { useGlobalContext } from "../Components/GlobalContext/GlobalContext"


const useUserContacts = (user_id) => {

    const { setFilteredContacts, setContactListData } = useGlobalContext()
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)
    const getUserContacts = async () => {
        const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/user/contacts/${user_id}`, {
            headers: getAuthenticatedHeaders()
        })
        if (response.ok){
            setContactListData(response.payload.contacts)
            setFilteredContacts(response.payload.contacts)
            setIsLoadingContacts(false)
        }
    }
    useEffect(
        () => {
            getUserContacts()
        },
        []
    )

    return { isLoadingContacts }
}

export default useUserContacts