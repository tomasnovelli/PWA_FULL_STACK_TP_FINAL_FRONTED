import React from 'react'
import ContactCards from '../ContactCards/ContactCards'
import './contactListStyles.css'
const ContactList = ({dataMock}) => {

    return (
        <div className='contactList'>
            {
                dataMock.map((contacts) => {
                    return (
                        <ContactCards contactData={contacts} key={contacts.contactId} />   
                    )
                })
            }
        </div>
    )
}

export default ContactList
