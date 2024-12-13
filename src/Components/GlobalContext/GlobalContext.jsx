import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

    const [contactListData, setContactListData] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [textInput, setTextInput] = useState('')
    const [searchContact, setSearchContact] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const [navigationState, setNavigationState] = useState('contacts')
    const [errors, setErrors] = useState('')
    const [conversation, setConversation] = useState([])
    const [messageOk, setMessageOk] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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
        if(searchContact.trim() === ''){
            setFilteredContacts(contactListData)
        } else {
            const newContactList = contactListData.filter(contact => contact.nickName.toLowerCase().includes(searchContact.toLowerCase()))
            setFilteredContacts(newContactList)
        }
    }, [searchContact, contactListData])

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
                    handleCleanSearchInput,
                    navigationState,
                    setNavigationState,
                    handleCloseDropdown,
                    errors,
                    setErrors,
                    conversation, 
                    setConversation,
                    messageOk, 
                    setMessageOk,
                    isLoading, 
                    setIsLoading,
                    filteredContacts, 
                    setFilteredContacts
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


