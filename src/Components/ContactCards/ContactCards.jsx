import React from 'react'
import { Link } from 'react-router-dom'
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
    console.log(contactId)
    return (
        <div className='contactsCardsContainer'>
            <div className='containerImg'>
                <img src={profilePicture} alt={'img_' + userName.toLowerCase()} />
            </div>
            <Link className='contactCard' to={'/contacts/chat/' + contactId} onClick={handleCleanSearchInput}>
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
