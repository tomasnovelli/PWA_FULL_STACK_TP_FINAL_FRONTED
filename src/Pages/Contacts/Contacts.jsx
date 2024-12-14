import React from 'react'
import './contacts.css'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Link, useParams } from 'react-router-dom'
import { ContactList, ContactListFooter, Header } from '../../Components/index.js'
import Community from '../Community/Community.jsx'
import useUserContacts from '../../Hooks/useUserContacts.jsx'

const Contacts = () => {
    const { user_id } = useParams()

    const {
        handleChangeContent,
        searchContact,
        navigationState,
        handleCloseDropdown,
        errors,
        filteredContacts 
    } = useGlobalContext()
    const { 
        isLoadingContacts 
    } = useUserContacts(user_id)

    return (
        <>
            {
                errors && 
                <span>{errors}</span>
            }
            {
                navigationState === 'contacts' &&
                <div className='contacts'>
                    <Header user_id={user_id} />
                    <div className='contactSearch'>
                        <label htmlFor="contactSearch"></label>
                        <input className='contactSearchInput' type="text" placeholder='Search Contact' name='contactSearch' id='contactSearch' onChange={handleChangeContent} value={searchContact} autoComplete='off' />
                    </div>
                    <Link onClick={handleCloseDropdown} to={`/contacts/${user_id}/addContact`}>
                        <button className='btn-addContact'>
                            <i className="bi bi-person-plus-fill"></i>
                        </button>
                    </Link>
                    {
                        isLoadingContacts ?
                        <div className='contactList'>
                            <span className='noContactsTextPosition'>Loading Contacts...</span>
                        </div> 
                        :(
                            filteredContacts.length === 0 
                            ?
                            <div className='contactList'>
                                <span className='noContactsTextPosition'>No Contacts Found..</span>
                            </div>
                            :<ContactList dataMock={filteredContacts} />
                        )
                    }
                    <ContactListFooter activeSite={navigationState} />
                </div>
            }
            {
                navigationState === 'community' &&
                <div className='contacts'>
                    <Header />
                    <Community />
                    <ContactListFooter activeSite={navigationState} />
                </div>
            }
        </>
    )
}

export default Contacts
