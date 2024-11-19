import React from 'react'
import './contacts.css'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Link } from 'react-router-dom'
import { ContactList, ContactListFooter, Header } from '../../Components/index.js'
import Community from '../Community/Community.jsx'

const Contacts = () => {
    const { 
        contactListData, 
        handleChangeContent, 
        searchContact, 
        navigationState } = useGlobalContext()

    return (
        <>
            {
                navigationState === 'contacts' &&
                <div className='contacts'>
                    <Header />
                    <div className='contactSearch'>
                        <label htmlFor="contactSearch"></label>
                        <input className='contactSearchInput' type="text" placeholder='Search Contact' name='contactSearch' id='contactSearch' onChange={handleChangeContent} value={searchContact} autoComplete='off' />
                    </div>
                    <Link to={'/contacts/addContact'}>
                        <button className='btn-addContact'>
                            <i className="bi bi-person-plus-fill"></i>
                        </button>
                    </Link>
                    <ContactList dataMock={contactListData} />
                    <ContactListFooter activeSite={navigationState}/>
                </div>
            }
            {
                navigationState === 'community' &&
                <div className='contacts'>
                    <Header />
                    <Community />
                    <ContactListFooter activeSite={navigationState}/>
                </div>
            }
        </>
    )
}

export default Contacts
