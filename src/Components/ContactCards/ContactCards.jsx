import React from 'react'
import { Link } from 'react-router-dom'
import './contactCardsStyle.css'
import { contactLastMessage } from '../../Helpers/chatData'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
const ContactCards = ({ contactData }) => {

    const { handleCleanSearchInput } = useGlobalContext()
    const {
        name,
        thumbnail,
        lastConection,
        id,
        message
    } = contactData
    const lastMessage = contactLastMessage(message)

    return (
        <div className='contactsCardsContainer'>
            <div className='containerImg'>
                <img src={thumbnail} alt={'img_' + name.toLowerCase()} />
            </div>
            <Link className='contactCard' to={'/contacts/chat/' + id} onClick={handleCleanSearchInput}>
                <div className='topContactCardInfo'>
                    <span>{name}</span>
                    <span className='lastConection'>{lastConection}</span>
                </div>
                <div className='bottomContactCardInfo'>
                    <span className='lastMessage'>{lastMessage}</span>
                </div>
            </Link>
        </div>
    )
}

export default ContactCards
