import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { Link } from 'react-router-dom'

const ContactsDropdownMenu = ({ user_id }) => {
    const {
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown
    } = useGlobalContext()
    const [deleteAccountState, setDeleteAccountState] = useState(false)

    return (
        <div>
            {
                dropdown &&
                <div>
                    <div className='chatDropdownMenu'>
                        <Link to={`/update-profile/${user_id}`}>
                            <span>Update Your Profile</span>
                        </Link>
                        <button onClick={() => setDeleteAccountState(!deleteAccountState)}>
                            <span>Delete Account</span>
                        </button>
                    </div>
                    {
                        deleteAccountState &&
                        <div>
                            <span>Are you sure you want to delete your account?</span>
                            <button onClick={() => setDeleteAccountState(!deleteAccountState)}>Cancel</button>
                            <button>Confirm</button>
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
