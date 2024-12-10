import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './contactCardsStyle.css'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
const ContactCards = ({ contactData }) => {

    const { handleCleanSearchInput } = useGlobalContext()
    const {
        contactId,
        nickName,
        userName,
        profilePicture,
        lastMessage,
        lastMessageDate
    } = contactData
    const lastMessageTimestamp = new Date(lastMessageDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const {user_id} = useParams()
    
    return (
        <div className='contactsCardsContainer'>
            <div className='containerImg'>
                <img src={profilePicture} alt={'img_' + userName.toLowerCase()} />
            </div>
            <Link className='contactCard' to={`/contacts/${user_id}/chat/${contactId}`} onClick={handleCleanSearchInput}>
                <div className='topContactCardInfo'>
                    <span>{nickName}</span>
                    {
                        !lastMessageDate
                        ?
                        <span className='lastConection'></span>
                        :
                        <span className='lastConection'>{lastMessageTimestamp}</span>
                    }   
                </div>
                <div className='bottomContactCardInfo'>
                    <span className='lastMessage'>{lastMessage}</span>
                </div>
            </Link>
        </div>
    )
}

export default ContactCards
