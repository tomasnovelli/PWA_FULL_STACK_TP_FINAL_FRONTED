import React from 'react'
import './ChatDropdownMenu.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { DELETE, getAuthenticatedHeaders, PUT } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'


const ChatDropdownMenu = () => {
    const {user_id, contact_id} = useParams()
    const navigate = useNavigate()
    const { 
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown,
        setConversation 
    } = useGlobalContext()

    const handleClearContactChat = async () => {
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
    const handleDeleteContactFromContactlist = async () => {
        try{
            const response = await DELETE(`${ENVIROMENT.URL_BACKEND}/api/contact/delete-contact/${user_id}/${contact_id}`, 
                { 
                    headers: getAuthenticatedHeaders() 
                }
            )
            if(response){
                setDropdown(!dropdown)
                navigate(`/contacts/${user_id}`)
            }
        }
        catch(error){
            console.error(error.message)
        }
    }

    return (
        <div>
            {
                dropdown &&
                <div className='chatDropdownMenu'>
                    <button className='btn-cleanChat' onClick={handleClearContactChat}>Clear Chat</button>
                    <button className='btn-cleanChat deleteContact' onClick={handleDeleteContactFromContactlist}>Delete Contact</button>
                    
                </div>
            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}

export default ChatDropdownMenu
