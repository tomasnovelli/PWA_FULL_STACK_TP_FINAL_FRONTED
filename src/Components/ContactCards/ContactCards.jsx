import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './contactCardsStyle.css'
import { contactLastMessage } from '../../Helpers/chatData'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
const ContactCards = ({ contactData }) => {

    const { handleCleanSearchInput } = useGlobalContext()
    const {
        contactId,
        nickName,
        userName,
        email,
        profilePicture
    } = contactData
    /* const lastMessage = contactLastMessage(message) */
    const {user_id} = useParams()
    return (
        <div className='contactsCardsContainer'>
            <div className='containerImg'>
                <img src={profilePicture} alt={'img_' + userName.toLowerCase()} />
            </div>
            <Link className='contactCard' to={`/contacts/${user_id}/chat/${contactId}`} onClick={handleCleanSearchInput}>
                <div className='topContactCardInfo'>
                    <span>{nickName}</span>
                    <span className='lastConection'>10:43</span>
                </div>
                <div className='bottomContactCardInfo'>
                    <span className='lastMessage'>LastMessage</span>
                </div>
            </Link>
        </div>
    )
}

export default ContactCards
