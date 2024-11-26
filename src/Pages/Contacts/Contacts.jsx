import React from 'react'
import './contacts.css'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Link, useParams } from 'react-router-dom'
import { ContactList, ContactListFooter, Header } from '../../Components/index.js'
import Community from '../Community/Community.jsx'
import ENVIROMENT from '../../Enviroment/enviroment.js'
import { GET, getAuthenticatedHeaders } from '../../Helpers/http.fetching.js'
import useUserContacts from '../../Hooks/useUserContacts.jsx'

const Contacts = () => {
    const { user_id } = useParams()
    const {
        handleChangeContent,
        searchContact,
        navigationState 
    } = useGlobalContext()
    const { 
        contactList, 
        isLoadingContacts 
    } = useUserContacts(user_id)

    return (
        <>
            {
                navigationState === 'contacts' &&
                <div className='contacts'>
                    <Header user_id={user_id} />
                    <div className='contactSearch'>
                        <label htmlFor="contactSearch"></label>
                        <input className='contactSearchInput' type="text" placeholder='Search Contact' name='contactSearch' id='contactSearch' onChange={handleChangeContent} value={searchContact} autoComplete='off' />
                    </div>
                    <Link to={`/contacts/${user_id}/addContact`}>
                        <button className='btn-addContact'>
                            <i className="bi bi-person-plus-fill"></i>
                        </button>
                    </Link>
                    {
                        isLoadingContacts ? 
                        <span>Loading Contacts...</span>
                        :(
                            contactList.length === 0 
                            ?<span>You don't have any contacts yet..</span>
                            :<ContactList dataMock={contactList} />
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
