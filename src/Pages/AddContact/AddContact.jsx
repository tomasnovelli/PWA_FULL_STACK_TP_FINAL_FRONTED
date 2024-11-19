import React from 'react'
import { Link } from 'react-router-dom'
import './addContactStyle.css'
import { AddContactForm } from '../../Components/index.js'

const AddContact = () => {

    return (
        <div className='addContactContainer'>
            <div className='addContactHeader'>
                <Link to='/contacts'><i className="backArrow bi bi-arrow-left-short"></i></Link>
                <span className='addContactTitle'>Add New Contact</span>
            </div>
            <AddContactForm />
        </div>
    )
}

export default AddContact
