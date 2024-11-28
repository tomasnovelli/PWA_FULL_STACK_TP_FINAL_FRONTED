import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthContext'

const ContactsDropdownMenu = ({ user_id }) => {
    const {
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown
    } = useGlobalContext()
    const {logOut} = useAuthContext()

    const [deleteAccountState, setDeleteAccountState] = useState(false)
    const handleDeleteYourAccount = (e) =>{
        e.preventDefault()
        
    }

    return (
        <div>
            {
                dropdown &&
                <div>
                    <div className='chatDropdownMenu'>
                        <Link className='btn-cleanChat' to={`/update-profile/${user_id}`}>
                            <span>Update Your Profile</span>
                        </Link>
                        <Link className='btn-cleanChat' onClick={logOut}>
                            <span>Log Out</span>
                        </Link>
                        <Link className='btn-cleanChat' onClick={() => setDeleteAccountState(!deleteAccountState)}>
                            <span>Delete Account</span>
                        </Link>
                    </div>
                    
                    {
                        deleteAccountState &&
                        <div className='chatDropdownMenu'>
                            <span>Are you sure you want to delete your account?</span>
                            <button onClick={() => setDeleteAccountState(!deleteAccountState)}>Cancel</button>
                            <button onClick={handleDeleteYourAccount}>Confirm</button>
                        </div>
                    }
                </div>

            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}


export default ContactsDropdownMenu
