import React from 'react'
import './ChatDropdownMenu.css'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { saveContactDatabase , getContactDatabase } from '../../Helpers/chatData'
import { getAuthenticatedHeaders, PUT } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'


const ChatDropdownMenu = () => {
    const {user_id, contact_id} = useParams()
    const { 
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown,
        setConversation 
    } = useGlobalContext()

    const borrarmessageDeContacto = async () => {
        try{
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/messages/delete-conversation/${user_id}/${contact_id}`, 
                { 
                    headers: getAuthenticatedHeaders() 
                }
            )
            if(response){
                setConversation(response.payload.detail)
                setDropdown(!dropdown)
            } else{
                throw new Error(response.message)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <div>
            {
                dropdown &&
                <div className='chatDropdownMenu'>
                    <button className='btn-cleanChat' onClick={borrarmessageDeContacto}>Clear Chat</button>
                    <button className='btn-cleanChat deleteContact' onClick={handleCloseDropdown}>Delete Contact</button>
                    
                </div>
            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}

export default ChatDropdownMenu
