import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import { getContactDatabase, saveContactDatabase } from '../../Helpers/chatData'

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

    const [contactListData, setContactListData] = useState([])
    const [textInput, setTextInput] = useState('')
    const [searchContact, setSearchContact] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const [navigationState, setNavigationState] = useState('contacts')
    const [errors, setErrors] = useState('')
    const [conversation, setConversation] = useState([])
    /* const getContactDataById = (id) => getContactDatabase().find(contactos => contactos.id === id) */
    /* const getContactIndex = (id, contactList) => contactList.findIndex(contact => contact.id === id) */

/*     const updateContact = (updatedContactData) => {
        const updatedContactListData = getContactDatabase()
        const contactIndex = getContactIndex(updatedContactData.id, updatedContactListData)
        updatedContactListData[contactIndex] = updatedContactData
        setContactListData(prevContactListData => updatedContactListData)
        saveContactDatabase(updatedContactListData)
    } */
    const handleChangeContentValue = (e) => {
        setTextInput(e.target.value)
    }
    const handleChangeContent = (e) => {
        setSearchContact(e.target.value)
    }
    const handleCleanSearchInput = (e) => {
        setSearchContact('')
    }
    const handleCloseDropdown = (e) => {
        if (dropdown = true) {
            setDropdown(!dropdown)
        }
    }
    useEffect(() => {
        /* const contactListToSearch = contactListData */
        const newContactList = contactListData.filter(contact => contact.nickName.toLowerCase().includes(searchContact.toLowerCase()))
        setContactListData(
            (prevContactListData) => {return newContactList}
        )
    }, [searchContact])
    const handleOpenCloseDropDownMenu = () => setDropdown(!dropdown)


    return (
        <div>
            <GlobalContext.Provider value={
                {
                    contactListData,
                    setContactListData,
                    handleChangeContentValue,
                    textInput,
                    setTextInput,
                    searchContact,
                    handleChangeContent,
                    dropdown,
                    setDropdown,
                    handleOpenCloseDropDownMenu,
                    /* clearLocalStorage, */
                    handleCleanSearchInput,
                    navigationState,
                    setNavigationState,
                    handleCloseDropdown,
                    errors,
                    setErrors,
                    conversation, 
                    setConversation
                }
            }>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


