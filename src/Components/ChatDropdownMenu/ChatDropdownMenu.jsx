import React from 'react'
import './ChatDropdownMenu.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { saveContactDatabase , getContactDatabase } from '../../Helpers/chatData'


const ChatDropdownMenu = ({ userId }) => {

    const { 
        setContactListData,
        getContactIndex,
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown 
    } = useGlobalContext()

    const borrarmessageDeContacto = () => {
        const contactDataBase = getContactDatabase()
        const searchedContactIndex = getContactIndex(userId, contactDataBase)
        contactDataBase[searchedContactIndex ].message = []
        setContactListData(contactDataBase)
        saveContactDatabase (contactDataBase)
        setDropdown(!dropdown)
    }

    return (
        <div>
            {
                dropdown &&
                <div className='chatDropdownMenu'>
                    <Link className='contactInfoLink' onClick={handleCloseDropdown} to={'/contacts/chat/' + userId + '/info'}>See Contact</Link>
                    <button className='btn-cleanChat' onClick={borrarmessageDeContacto}>Clear Chat</button>
                </div>
            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}

export default ChatDropdownMenu
